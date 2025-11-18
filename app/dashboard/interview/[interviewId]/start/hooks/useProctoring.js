"use client";

import { useEffect, useRef, useState } from "react";
import * as faceapi from "@vladmandic/face-api";

export default function useProctoring(interviewId, options = {}) {
  const { reuseStream = null, requireFaceCheck = true, violationLimit = 3 } = options;

  const [violations, setViolations] = useState(0);
  const streamRef = useRef(reuseStream);
  const faceIntervalRef = useRef(null);

  const dispatchWarning = (count) => {
    const ev = new CustomEvent("proctor-warning", { detail: count });
    window.dispatchEvent(ev);
  };

  const reportViolation = (reason, meta = {}) => {
    setViolations((prev) => {
      const newCount = prev + 1;

      // send popup event
      if (newCount === 1 || newCount === 2) {
        dispatchWarning(newCount);
      }

      // Send log
      fetch("/api/proctor/violation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          interviewId,
          reason,
          meta,
          ts: Date.now(),
        }),
      });

      if (newCount >= violationLimit) {
        autoSubmit("max_violations_reached");
      }

      return newCount;
    });
  };

  const autoSubmit = (reason) => {
    fetch("/api/proctor/auto-submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ interviewId, reason }),
    }).finally(() => {
      window.location.href = `/dashboard/interview/${interviewId}/feedback`;
    });
  };

  // visibility/tab switching
  useEffect(() => {
    const handler = () => {
      if (document.visibilityState === "hidden") reportViolation("tab_hidden");
    };
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);

  // window blur
  useEffect(() => {
    const handler = () => reportViolation("window_blur");
    window.addEventListener("blur", handler);
    return () => window.removeEventListener("blur", handler);
  }, []);

  // fullscreen exit
  useEffect(() => {
    const handler = () => {
      if (!document.fullscreenElement) reportViolation("fullscreen_exit");
    };
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  // heartbeat every 15 seconds
  useEffect(() => {
    const hb = setInterval(() => {
      navigator.sendBeacon(
        "/api/proctor/heartbeat",
        JSON.stringify({ interviewId, ts: Date.now() })
      );
    }, 15000);
    return () => clearInterval(hb);
  }, []);

  // Face detection
  useEffect(() => {
    if (!requireFaceCheck) return;

    let missed = 0;

    async function initFaceCheck() {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");

      if (!streamRef.current) {
        try {
          streamRef.current = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
          });
        } catch {
          reportViolation("camera_denied");
          return;
        }
      }

      const video = document.createElement("video");
      video.srcObject = streamRef.current;
      video.setAttribute("playsinline", true);
      await video.play();

      faceIntervalRef.current = setInterval(async () => {
        const detection = await faceapi.detectSingleFace(
          video,
          new faceapi.TinyFaceDetectorOptions()
        );

        if (!detection) {
          missed++;
          if (missed >= 2) {
            reportViolation("face_not_detected");
            missed = 0;
          }
        } else {
          missed = 0;
        }
      }, 4000);
    }

    initFaceCheck();

    return () => {
      if (faceIntervalRef.current) clearInterval(faceIntervalRef.current);
    };
  }, [requireFaceCheck]);

  return { violations };
}
