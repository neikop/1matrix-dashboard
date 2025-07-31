import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"

const AnimatedDigit = ({ digit, size }: { digit: string; size: "lg" | "sm" }) => {
  return (
    <div className={"relative inline-block overflow-hidden text-center " + (size === "sm" ? "h-9 w-4" : "h-13 w-6")}>
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

const SlideNumber = ({ autoIncrease, autoRandom, cooldown, size = "sm", value }: Props) => {
  const [number, setNumber] = useState(value)
  const [digits, setDigits] = useState<string[]>([])

  useEffect(() => {
    setDigits(number.toString().split(""))
  }, [number])

  useEffect(() => {
    if (!autoIncrease && !autoRandom) return

    const interval = setInterval(() => {
      setNumber((prev) => {
        if (autoRandom) {
          const delta = Math.floor(Math.random() * 5) + 1 // 1 to 5
          const add = Math.random() > 0.5
          const next = add ? prev + delta : prev - delta
          return Math.max(0, next)
        } else if (autoIncrease) {
          return prev + 1
        }
        return prev
      })
    }, cooldown ?? 2000)

    return () => clearInterval(interval)
  }, [autoIncrease, autoRandom, cooldown])

  return (
    <div className="flex text-2xl font-bold">
      {digits.map((d, i) => (
        <AnimatedDigit digit={d} key={i} size={size} />
      ))}
    </div>
  )
}

export default SlideNumber
