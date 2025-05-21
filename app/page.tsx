import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CoffeeBreakEvenCalculator() {
  const [data, setData] = useState({
    rent: 0,
    wages: 0,
    depreciation: 0,
    otherFixed: 0,
    coffeeCost: 0,
    cupCost: 0,
    ingredientCost: 0,
    otherVariable: 0,
    price: 0,
    profitGoal: 0,
  });

  const fixedCost =
    Number(data.rent) + Number(data.wages) + Number(data.depreciation) + Number(data.otherFixed);
  const variableCost =
    Number(data.coffeeCost) + Number(data.cupCost) + Number(data.ingredientCost) + Number(data.otherVariable);
  const marginPerCup = Number(data.price) - variableCost;

  const breakEvenCups = marginPerCup > 0 ? fixedCost / marginPerCup : 0;
  const breakEvenRevenue = breakEvenCups * Number(data.price);
  const dailySales = breakEvenCups / 22;

  const targetProfitCups =
    marginPerCup > 0 ? (fixedCost + Number(data.profitGoal)) / marginPerCup : 0;
  const targetDailySales = targetProfitCups / 22;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="grid gap-6 p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">☕ 咖啡店盈亏平衡计算器</h1>

      <Card>
        <CardContent className="grid gap-4 p-4">
          <h2 className="text-xl font-semibold">固定成本（月）</h2>
          {[
            ["房租", "rent"],
            ["工资", "wages"],
            ["设备折旧", "depreciation"],
            ["其他固定支出", "otherFixed"],
          ].map(([label, name]) => (
            <div key={name} className="grid grid-cols-2 items-center gap-2">
              <Label>{label} (¥)</Label>
              <Input type="number" name={name} value={data[name]} onChange={handleChange} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="grid gap-4 p-4">
          <h2 className="text-xl font-semibold">变动成本（每杯）</h2>
          {[
            ["咖啡豆", "coffeeCost"],
            ["杯具", "cupCost"],
            ["糖/奶/辅料", "ingredientCost"],
            ["其他", "otherVariable"],
          ].map(([label, name]) => (
            <div key={name} className="grid grid-cols-2 items-center gap-2">
              <Label>{label} (¥)</Label>
              <Input type="number" name={name} value={data[name]} onChange={handleChange} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="grid gap-4 p-4">
          <h2 className="text-xl font-semibold">售价与目标</h2>
          {[
            ["单杯售价", "price"],
            ["目标利润（可空）", "profitGoal"],
          ].map(([label, name]) => (
            <div key={name} className="grid grid-cols-2 items-center gap-2">
              <Label>{label} (¥)</Label>
              <Input type="number" name={name} value={data[name]} onChange={handleChange} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="grid gap-4 p-4">
          <h2 className="text-xl font-semibold">计算结果</h2>
          <div className="grid gap-2">
            <div>固定成本合计：¥{fixedCost.toFixed(2)}</div>
            <div>单杯变动成本：¥{variableCost.toFixed(2)}</div>
            <div>单杯利润：¥{marginPerCup.toFixed(2)}</div>
            <div>盈亏平衡杯数：{breakEvenCups.toFixed(2)} 杯</div>
            <div>盈亏平衡收入：¥{breakEvenRevenue.toFixed(2)}</div>
            <div>建议日销量（22天）：{dailySales.toFixed(2)} 杯</div>
            <div>目标利润所需杯数：{targetProfitCups.toFixed(2)} 杯</div>
            <div>建议日销量（目标利润，22天）：{targetDailySales.toFixed(2)} 杯</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
