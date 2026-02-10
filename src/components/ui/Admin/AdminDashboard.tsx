import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../card";
import { Button } from "../button";
import { FieldDescription } from "../field";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-2xl flex-col gap-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
            <CardDescription>
              Manage events and registrations from one place.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6">
            <FieldDescription className="text-center">
              Use the button below to view and manage all events.
            </FieldDescription>
            <Link to="/admin/dashboard/events">
              <Button variant="white" size="lg">
                Events
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

