import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

function PeranItem(props) {
    let { data, disabled } = props;
    return (
        <div className="grid grid-cols-1 space-y-2 items-center">
            <h3 className="text-base font-medium">{data.nama_lengkap}</h3>
            <Select defaultValue={data.peran} disabled={disabled}>
                <SelectTrigger>
                    <SelectValue placeholder="Pilih peran wali" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="AYAH">Ayah</SelectItem>
                    <SelectItem value="IBU">Ibu</SelectItem>
                    <SelectItem value="WALI">Wali</SelectItem>
                    <SelectItem value="lainnya">Lainnya</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}

// let DATA = [
//     {
//         nama_lengkap: "Muhammad Luthfi Irfan",
//         peran: "AYAH",
//     },
//     {
//         nama_lengkap: "Santri 2",
//         peran: "IBU",
//     },
//     {
//         nama_lengkap: "Santri 2",
//         peran: "IBU",
//     },
// ];

export default function PeranView({ data, disabled = false }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Perwalian</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent className=" space-y-6">
                {data.map((item, i) => {
                    return (
                        <PeranItem key={i} disabled={disabled} data={item} />
                    );
                })}
            </CardContent>
            <CardFooter></CardFooter>
        </Card>
    );
}
