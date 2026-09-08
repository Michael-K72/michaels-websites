"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CONCEPTS } from "@/data/concepts";

gsap.registerPlugin(ScrollTrigger);

export function LayerUnfold() {
  const rootRef = useRef<HTMLElement>(null);
  const lead = CONCEPTS[0];
  const sideA = CONCEPTS[1];
  const sideB = CONCEPTS[2];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = window.matchMedia("(max-width: 699px)").matches;
    if (reduced || narrow) {
      root.classList.add("home-unfold--static");
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=160%",
          pin: ".home-unfold__pin",
          scrub: 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        ".home-unfold__ambient",
        { yPercent: 0, scale: 1.05 },
        { yPercent: -8, scale: 1.12, ease: "none" },
        0,
      )
        .fromTo(
          ".home-unfold__core",
          { yPercent: 0, rotateY: 0, z: 0 },
          { yPercent: -4, rotateY: -4, z: 40, ease: "none" },
          0.08,
        )
        .fromTo(
          ".home-unfold__panel--left",
          { xPercent: 0, rotateY: 0, opacity: 0.85 },
          { xPercent: -42, rotateY: 8, opacity: 1, ease: "none" },
          0.15,
        )
        .fromTo(
          ".home-unfold__panel--right",
          { xPercent: 0, rotateY: 0, opacity: 0.85 },
          { xPercent: 42, rotateY: -8, opacity: 1, ease: "none" },
          0.15,
        )
        .fromTo(
          ".home-unfold__copy",
          { y: 24, opacity: 0.35 },
          { y: 0, opacity: 1, ease: "none" },
          0.35,
        )
        .fromTo(
          ".home-unfold__light",
          { opacity: 0.35, scale: 0.85 },
          { opacity: 0.9, scale: 1.15, ease: "none" },
          0.2,
        )
        .to(".home-unfold__core", { rotateY: 0, z: 20, ease: "none" }, 0.72)
        .to(
          [".home-unfold__panel--left", ".home-unfold__panel--right"],
          { opacity: 0.75, ease: "none" },
          0.78,
        );
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const fontsReady = document.fonts?.ready?.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      void fontsReady;
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="home-unfold home-section"
      aria-labelledby="home-unfold-title"
    >
      <div className="home-unfold__pin">
        <div className="home-unfold__stage">
          <div className="home-unfold__layer home-unfold__bg" aria-hidden />
          <div className="home-unfold__layer home-unfold__ambient">
            <Image
              src={lead.previewImage}
              alt=""
              fill
              sizes="80vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="home-unfold__layer home-unfold__panel home-unfold__panel--left">
            <Image src={sideA.previewImage} alt="" fill sizes="30vw" className="object-cover" />
          </div>
          <div className="home-unfold__layer home-unfold__panel home-unfold__panel--right">
            <Image src={sideB.previewImage} alt="" fill sizes="30vw" className="object-cover" />
          </div>
          <div className="home-unfold__layer home-unfold__core">
            <div className="home-unfold__chrome" aria-hidden>
              <span className="home-unfold__dot" />
              <span className="home-unfold__dot" />
              <span className="home-unfold__dot" />
            </div>
            <div className="absolute inset-x-0 bottom-0 top-8">
              <Image
                src={lead.detailImage}
                alt="Composed website preview layers"
                fill
                sizes="(max-width: 900px) 90vw, 55vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div className="home-unfold__layer home-unfold__light" aria-hidden />
          <div className="home-unfold__copy">
            <p className="home-eyebrow">Craft in layers</p>
            <h2 id="home-unfold-title">Structure, image, and interface—revealed with intent.</h2>
            <p>
              Every collaboration starts as a clear composition. Scrolling opens the
              working pieces so you can see how a premium site is built to feel.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
