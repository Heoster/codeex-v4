import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Shapes } from "lucide-react";

export default function ToolsPage() {
  return (
    <div className="p-4 md:p-6">
        <Card>
            <CardHeader>
                <CardTitle>Tools</CardTitle>
                <CardDescription>Explore powerful tools to enhance your workflow.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg">
                    <Shapes className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Tools Available</h3>
                    <p className="text-muted-foreground">New tools will be added here soon.</p>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
