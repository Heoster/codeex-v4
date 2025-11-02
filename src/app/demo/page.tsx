import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Wand2 } from "lucide-react";

export default function DemoPage() {
  return (
    <div className="p-4 md:p-6">
        <Card>
            <CardHeader>
                <CardTitle>Magical Demo</CardTitle>
                <CardDescription>Experience the magic of Codeex AI.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg">
                    <Wand2 className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
                    <p className="text-muted-foreground">A magical, interactive demo is being conjured!</p>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
