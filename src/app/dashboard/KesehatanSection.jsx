import {
    getTop5PenyakitSantri,
    getTrenKesehatanOneYearBehind,
} from "@/actions/dashboard";
import { PieChartComponent, BarChartComponent } from "@/components/Chart";
import {
    generateChartDataAndConfigTop5,
    generateChartDataAndConfigTrenMonthly,
} from "@/lib/utils";

export default async function KesehatanSection() {
    let penyakitTop5 = await getTop5PenyakitSantri();
    let penyakitTren = await getTrenKesehatanOneYearBehind();
    let dataResponse = await Promise.all([penyakitTop5, penyakitTren]);
    const pieChartConfig = generateChartDataAndConfigTop5(dataResponse[0]);
    const barChartConfig = generateChartDataAndConfigTrenMonthly(
        dataResponse[1]
    );
    return (
        <div>
            <h2 className="font-bold my-5">Kesehatan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
                <BarChartComponent
                    title="Tren Kesehatan"
                    description="Jumlah santri sakit pada setiap bulan"
                    chartConfig={barChartConfig.chartConfig}
                    chartData={barChartConfig.chartData}
                />
                <PieChartComponent
                    title="Penyakit Terbanyak"
                    description="5 Penyakit terbanyak pada tahun ini"
                    chartConfig={pieChartConfig.chartConfig}
                    chartData={pieChartConfig.chartData}
                />
            </div>
        </div>
    );
}
