import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { LayoutDashboard } from "lucide-react";

export default function LearningPage() {
  return (
    <div className="p-4 md:p-6">
        <Card>
            <CardHeader>
                <CardTitle>Learning Paths</CardTitle>
                <CardDescription>Follow guided paths to master new skills.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg">
                    <LayoutDashboard className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
                    <p className="text-muted-foreground">Interactive learning paths will be available here.</p>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
