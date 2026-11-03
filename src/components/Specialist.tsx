"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import SpecialistProfileModal from "./SpecialistProfileModal";
import "./Specialist.css";

// Under the photo box: the specialist who leads the care. A portrait led feature: his name huge on the left, his cut out photo
// on the right. "View full profile" opens his full profile in a modal. The look lives in Specialist.css.
export default function Specialist() {
  const [profileOpen, setProfileOpen] = useState(false);
  const closeProfile = useCallback(() => setProfileOpen(false), []);

  return (
    <section className="expert-showcase" id="specialist" aria-labelledby="expert-title">
      <div className="expert-showcase-inner">
        <div className="showcase-copy">
          <p className="showcase-kicker">Nigeria’s IVF pioneer in your corner</p>
          <h3 id="expert-title">
            Dr Ibrahim
            <span>Wada, OON</span>
          </h3>
          <p className="showcase-credentials">MBBS · FRCOG · FWACS · MBA</p>
          <p className="showcase-bio">
            A pioneer of IVF in Nigeria for over 35 years. He led the team behind Nigeria’s first government authenticated IVF baby in 1998 and
            reported one of the country’s first sickle cell free births following embryo testing.
          </p>

          <button type="button" className="showcase-action" aria-haspopup="dialog" onClick={() => setProfileOpen(true)}>
            View full profile
          </button>
        </div>

        <div className="showcase-portrait">
          <div className="portrait-halo" aria-hidden="true" />
          <Image
            src="/team/wada-portrait.png"
            alt="Dr Ibrahim Wada, fertility specialist and IVF pioneer"
            width={1072}
            height={1976}
            sizes="(min-width: 971px) 40vw, 90vw"
          />
        </div>
      </div>

      <SpecialistProfileModal open={profileOpen} onClose={closeProfile} />
    </section>
  );
}
