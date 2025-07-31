import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    amt: 2400,
    name: "Page A",
    pv: 2400,
    uv: 4000,
  },
  {
    amt: 2210,
    name: "Page B",
    pv: 1398,
    uv: 3000,
  },
  {
    amt: 2290,
    name: "Page C",
    pv: 9800,
    uv: 2000,
  },
  {
    amt: 2000,
    name: "Page D",
    pv: 3908,
    uv: 2780,
  },
  {
    amt: 2181,
    name: "Page E",
    pv: 4800,
    uv: 1890,
  },
  {
    amt: 2500,
    name: "Page F",
    pv: 3800,
    uv: 2390,
  },
  {
    amt: 2100,
    name: "Page G",
    pv: 4300,
    uv: 3490,
  },
]

const InfoChart = () => {
  return (
    <ResponsiveContainer height="100%" width="100%">
      <LineChart
        data={data}
        height={300}
        margin={{
          bottom: 5,
          left: 20,
          right: 30,
          top: 5,
        }}
        width={500}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line activeDot={{ r: 8 }} dataKey="pv" stroke="#8884d8" type="monotone" />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default InfoChart
