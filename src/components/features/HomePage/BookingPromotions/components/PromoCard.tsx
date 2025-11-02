"use client";

import { useState } from "react";

import { CheckIcon, CopyIcon } from "@/components/ui/Icon";

type PromoCardProps = {
    gradient?: string,
    title: string,
    subtitle: string,
    code: string,
    img: string,
};

export default function PromoCard(props: PromoCardProps) {
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    const copyCode = async (code: string) => {
        try {
            await navigator.clipboard.writeText(code);
            setCopiedCode(code);
            setTimeout(() => setCopiedCode(null), 2000);
        } catch (err) {
            console.error("Failed to copy code:", err);
        }
    };

  return (
    <div className={`rounded-2xl overflow-hidden shadow-md`}>
        <div className={`bg-gradient-to-br ${props.gradient} p-5 text-white rounded-2xl h-full`}> 
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                    <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center overflow-hidden">
                        <img src={props.img} alt="promo" className="w-12 h-12 object-cover" />
                    </div>
                </div>
                
                <div className="flex-1">
                    <h4 className="text-base font-bold leading-tight">
                        {props.title}
                    </h4>

                    <p className="text-sm opacity-90 mt-2">{props.subtitle}</p>

                    <div className="mt-4 flex items-center gap-3">
                        <div className="px-3 py-1 border-2 border-dashed border-white rounded-md text-xs font-semibold tracking-wider">{props.code}</div>
                        <button onClick={() => copyCode(props.code)} aria-label={`Copy ${props.code}`} className="w-8 h-8 rounded-md bg-white/20 flex items-center justify-center">
                        {copiedCode === props.code ? (
                            <CheckIcon />
                        ) : (
                            <CopyIcon />
                        )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
