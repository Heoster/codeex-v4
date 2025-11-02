import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { History } from "lucide-react";

export default function HistoryPage() {
  return (
    <div className="p-4 md:p-6">
        <Card>
            <CardHeader>
                <CardTitle>History</CardTitle>
                <CardDescription>Review your past conversations.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg">
                    <History className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No History Yet</h3>
                    <p className="text-muted-foreground">Your past conversations will appear here.</p>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
