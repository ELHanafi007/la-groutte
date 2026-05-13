"use client";

import React, { useMemo } from "react";
import QRCode from "qrcode";
import Image from "next/image";

interface BrandedQRCodeProps {
  value: string;
  size?: number;
  logoUrl?: string;
  logoSize?: number;
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
  className?: string;
}

export const BrandedQRCode: React.FC<BrandedQRCodeProps> = ({
  value,
  size = 300,
  logoUrl = "/logo.jpg",
  logoSize = 60,
  primaryColor = "#C62828", // Crimson
  secondaryColor = "#D4A853", // Gold
  backgroundColor = "transparent",
  className,
}) => {
  const qrData = useMemo(() => {
    try {
      const qr = QRCode.create(value, { errorCorrectionLevel: "H" });
      const { modules } = qr;
      return {
        size: modules.size,
        data: modules.data,
      };
    } catch (err) {
      console.error("QR Generation error:", err);
      return null;
    }
  }, [value]);

  if (!qrData) return null;

  const { size: matrixSize, data } = qrData;
  const cellSize = size / matrixSize;

  // Helper to check if a cell is part of the "eyes" (finder patterns)
  const isEye = (x: number, y: number) => {
    // Top-left
    if (x < 7 && y < 7) return true;
    // Top-right
    if (x >= matrixSize - 7 && y < 7) return true;
    // Bottom-left
    if (x < 7 && y >= matrixSize - 7) return true;
    return false;
  };

  // Helper to check if a cell is in the center area (where logo goes)
  const isCenter = (x: number, y: number) => {
    const centerStart = Math.floor((matrixSize - (logoSize / cellSize)) / 2) - 1;
    const centerEnd = Math.ceil((matrixSize + (logoSize / cellSize)) / 2) + 1;
    return x >= centerStart && x < centerEnd && y >= centerStart && y < centerEnd;
  };

  const renderCells = () => {
    const cells: React.ReactNode[] = [];

    for (let y = 0; y < matrixSize; y++) {
      for (let x = 0; x < matrixSize; x++) {
        if (data[y * matrixSize + x]) {
          if (isEye(x, y)) {
            // We'll skip eyes here and render them separately for custom shapes
            continue;
          }

          if (isCenter(x, y)) {
            continue;
          }

          // Render dots (rounded circles) for a premium feel
          cells.push(
            <circle
              key={`cell-${x}-${y}`}
              cx={x * cellSize + cellSize / 2}
              cy={y * cellSize + cellSize / 2}
              r={cellSize / 2.4} // Slightly smaller than full cell for "dot" look
              fill={primaryColor}
            />
          );
        }
      }
    }

    return cells;
  };

  const renderEyes = () => {
    const eyes: React.ReactNode[] = [];
    const positions = [
      { x: 0, y: 0 },
      { x: matrixSize - 7, y: 0 },
      { x: 0, y: matrixSize - 7 },
    ];

    positions.forEach((pos, index) => {
      const x = pos.x * cellSize;
      const y = pos.y * cellSize;
      const s = 7 * cellSize;

      eyes.push(
        <g key={`eye-${index}`}>
          {/* Outer Frame */}
          <rect
            x={x + cellSize / 2}
            y={y + cellSize / 2}
            width={s - cellSize}
            height={s - cellSize}
            rx={cellSize * 1.5}
            fill="none"
            stroke={secondaryColor}
            strokeWidth={cellSize}
          />
          {/* Inner Dot */}
          <rect
            x={x + 2 * cellSize + cellSize / 2}
            y={y + 2 * cellSize + cellSize / 2}
            width={3 * cellSize - cellSize}
            height={3 * cellSize - cellSize}
            rx={cellSize}
            fill={primaryColor}
          />
        </g>
      );
    });

    return eyes;
  };

  return (
    <div className={className} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {backgroundColor !== "transparent" && (
          <rect width={size} height={size} fill={backgroundColor} rx={size * 0.05} />
        )}
        
        {/* Background dots for extra "vibe" (optional) */}
        <g opacity="0.03">
          {Array.from({ length: matrixSize }).map((_, y) => 
            Array.from({ length: matrixSize }).map((_, x) => (
              <circle
                key={`bg-dot-${x}-${y}`}
                cx={x * cellSize + cellSize / 2}
                cy={y * cellSize + cellSize / 2}
                r={cellSize / 6}
                fill={primaryColor}
              />
            ))
          )}
        </g>

        <g>{renderCells()}</g>
        <g>{renderEyes()}</g>

        {/* Logo in the center */}
        {logoUrl && (
          <foreignObject
            x={(size - logoSize) / 2}
            y={(size - logoSize) / 2}
            width={logoSize}
            height={logoSize}
          >
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl border-2 border-surface-elevated bg-white shadow-lg">
              <Image
                src={logoUrl}
                alt="Logo"
                fill
                className="object-cover"
              />
            </div>
          </foreignObject>
        )}
      </svg>
    </div>
  );
};
