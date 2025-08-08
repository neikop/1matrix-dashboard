import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"

const AnimatedDigit = ({ digit, size }: { digit: string; size: "lg" | "sm" }) => {
  const isDigit = /[0-9]/.test(digit)
  return (
    <div
      className={"relative inline-block overflow-hidden text-center"}
      style={{
        height: size === "sm" ? 36 : 52,
        width: (size === "sm" ? 16 : 24) / (isDigit ? 1 : 2),
      }}
    >
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          animate={{ opacity: 1, y: "0%" }}
          className="absolute w-full"
          exit={{ opacity: 0, y: "-100%" }}
          initial={{ opacity: 0, y: "100%" }}
          key={digit}
          transition={{ duration: 0.3 }}
        >
          {digit}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

type Props = {
  autoIncrease?: boolean
  autoRandom?: boolean
  cooldown?: number
  size?: "lg" | "sm"
  value: number
}

const SlideNumber = ({ size = "sm", value: number }: Props) => {
  const [digits, setDigits] = useState<string[]>([])

  useEffect(() => {
    const value = new Intl.NumberFormat("en-US", { maximumFractionDigits: 3 }).format(number ?? 0)
    setDigits(value.toString().split(""))
  }, [number])

  return (
    <div className="flex text-2xl font-bold">
      {digits.map((d, i) => (
        <AnimatedDigit digit={d} key={i} size={size} />
      ))}
    </div>
  )
}

export { SlideNumber }
