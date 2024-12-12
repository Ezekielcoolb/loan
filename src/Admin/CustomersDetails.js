import React from "react";
import MonthlySalesChart from "./csoMatrics/MonthlySalesChart";
import WeeklySalesChart from "./csoMatrics/WeeklySalesChart";
import DailySalesChart from "./csoMatrics/DailySalesChart";
import YearlySalesChart from "./csoMatrics/YearlySalesChart";



const CustomersDetails = () => {
    return (
        <div>
            <YearlySalesChart />
            <MonthlySalesChart />
            <WeeklySalesChart />
            <DailySalesChart />
        </div>
    )
}
 export default CustomersDetails