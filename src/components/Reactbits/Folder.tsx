"use client"

import type React from "react"
import { useState } from "react"
import { Instagram, Linkedin, Github } from "lucide-react"

interface FolderProps {
  color?: string
  size?: number
  items?: React.ReactNode[]
  className?: string
}

const darkenColor = (hex: string, percent: number): string => {
  let color = hex.startsWith("#") ? hex.slice(1) : hex
  if (color.length === 3) {
    color = color
      .split("")
      .map((c) => c + c)
      .join("")
  }
  const num = Number.parseInt(color, 16)
  let r = (num >> 16) & 0xff
  let g = (num >> 8) & 0xff
  let b = num & 0xff
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))))
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))))
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))))
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
}

const Folder: React.FC<FolderProps> = ({ color = "#00d8ff", size = 1, items = [], className = "" }) => {
  const maxItems = 3
  const papers = items.slice(0, maxItems)
  while (papers.length < maxItems) {
    papers.push(null)
  }

  const [isHovered, setIsHovered] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [paperOffsets, setPaperOffsets] = useState<{ x: number; y: number }[]>(
    Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })),
  )

  const folderBackColor = darkenColor(color, 0.08)
  const paper1 = "#FFC5C5"; 
  const paper2 = "#0077B5";
  const paper3 = "#000000";

  const handleClick = () => {
    setIsOpen((prev) => !prev)
    if (isOpen) {
      setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })))
    }
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (!isOpen) {
      setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })))
    }
  }

  const handlePaperMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    if (!isHovered && !isOpen) return
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const offsetX = (e.clientX - centerX) * 0.15
    const offsetY = (e.clientY - centerY) * 0.15
    setPaperOffsets((prev) => {
      const newOffsets = [...prev]
      newOffsets[index] = { x: offsetX, y: offsetY }
      return newOffsets
    })
  }

  const handlePaperMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    setPaperOffsets((prev) => {
      const newOffsets = [...prev]
      newOffsets[index] = { x: 0, y: 0 }
      return newOffsets
    })
  }

  const folderStyle: React.CSSProperties = {
    "--folder-color": color,
    "--folder-back-color": folderBackColor,
    "--paper-1": paper1,
    "--paper-2": paper2,
    "--paper-3": paper3,
  } as React.CSSProperties

  // Outer scale style
  const scaleStyle = { transform: `scale(${size * 0.3})` }

  const getSpreadTransform = (index: number) => {
    if (index === 0) return "translate(-120%, -70%) rotate(-15deg)"
    if (index === 1) return "translate(10%, -70%) rotate(15deg)"
    if (index === 2) return "translate(-50%, -100%) rotate(5deg)"
    return ""
  }

  // Social media icons for each paper
  const socialIcons = [
    // Instagram for paper 1
    <a
      href="https://www.instagram.com/kimyo.visuals/"
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="flex items-center justify-center w-full h-full transition-opacity duration-300"
      key="instagram"
    >
      <Instagram className="text-black" size={18} />
    </a>,
    // LinkedIn for paper 2
    <a
      href="https://www.linkedin.com/in/asadali1234/"
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="flex items-center justify-center w-full h-full transition-opacity duration-300"
      key="linkedin"
    >
      <Linkedin className="text-white" size={18} />
    </a>,
    // GitHub for paper 3
    <a
      href="https://github.com/Asad-noob69"
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="flex items-center justify-center w-full h-full transition-opacity duration-300"
      key="github"
    >
      <Github className="text-white" size={18} />
    </a>,
  ]

  return (
    <div style={scaleStyle} className={className}>
      <div
        className="group relative transition-all duration-200 ease-in cursor-pointer"
        style={folderStyle}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="relative w-[100px] h-[80px] rounded-tl-0 rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px]"
          style={{ backgroundColor: folderBackColor }}
        >
          <span
            className="absolute z-0 bottom-[98%] left-0 w-[30px] h-[10px] rounded-tl-[5px] rounded-tr-[5px] rounded-bl-0 rounded-br-0"
            style={{ backgroundColor: folderBackColor }}
          ></span>
          {/* Render papers */}
          {papers.map((item, i) => {
            let sizeClasses = ""
            if (i === 0) sizeClasses = "w-[70%] h-[80%]"
            if (i === 1) sizeClasses = "w-[70%] h-[80%]"
            if (i === 2) sizeClasses = "w-[70%] h-[80%]"

            const transformStyle =
              isHovered || isOpen
                ? `${getSpreadTransform(i)} translate(${paperOffsets[i].x}px, ${paperOffsets[i].y}px)`
                : undefined

            return (
              <div
                key={i}
                onMouseMove={(e) => handlePaperMouseMove(e, i)}
                onMouseLeave={(e) => handlePaperMouseLeave(e, i)}
                className={`absolute z-20 bottom-[10%] left-1/2 transition-all duration-300 ease-in-out ${
                  !(isHovered || isOpen) ? "transform -translate-x-1/2 translate-y-[10%]" : "hover:scale-110"
                } ${sizeClasses}`}
                style={{
                  ...(!(isHovered || isOpen) ? {} : { transform: transformStyle }),
                  backgroundColor: i === 0 ? paper1 : i === 1 ? paper2 : paper3,
                  borderRadius: "10px",
                }}
              >
                {item || socialIcons[i]}
              </div>
            )
          })}
          <div
            className={`absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out ${
              isHovered || isOpen ? "[transform:skew(15deg)_scaleY(0.6)]" : ""
            }`}
            style={{
              backgroundColor: color,
              borderRadius: "5px 10px 10px 10px",
            }}
          ></div>
          <div
            className={`absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out ${
              isHovered || isOpen ? "[transform:skew(-15deg)_scaleY(0.6)]" : ""
            }`}
            style={{
              backgroundColor: color,
              borderRadius: "5px 10px 10px 10px",
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default Folder

