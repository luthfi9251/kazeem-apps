import {
    getTop5PelanggaranKategori,
    getTrenPelanggarannOneYearBehind,
} from "@/actions/dashboard";
import { PieChartComponent, BarChartComponent } from "@/components/Chart";
import {
    generateChartDataAndConfigTop5,
    generateChartDataAndConfigTrenMonthly,
} from "@/lib/utils";

export default async function PelanggaranSection() {
    const pelanggaranTop5 = getTop5PelanggaranKategori();
    const pelanggaranTren = getTrenPelanggarannOneYearBehind();
    let dataResponse = await Promise.all([pelanggaranTop5, pelanggaranTren]);
    const pieChartConfig = generateChartDataAndConfigTop5(dataResponse[0]);
    const barChartConfig = generateChartDataAndConfigTrenMonthly(
        dataResponse[1]
    );
    return (
        <div>
            <h2 className="font-bold my-5">Pelanggaran</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
                <BarChartComponent
                    title="Tren Pelanggaran"
                    description="Jumlah pelanggaran pada setiap bulan"
                    chartConfig={barChartConfig.chartConfig}
                    chartData={barChartConfig.chartData}
                />
                <PieChartComponent
                    title="Jenis Pelanggaran Terbanyak"
                    description="5 Pelanggaran terbanyak pada tahun ini"
                    chartConfig={pieChartConfig.chartConfig}
                    chartData={pieChartConfig.chartData}
                />
            </div>
        </div>
    );
}
