import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardContent, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import {
  CalendarDays,
  Mail,
  Phone,
  MapPin,
  User,
  Stethoscope,
  ClipboardList,
} from "lucide-react";
import { format } from "date-fns";
import { getUserbyId } from "../functions/userFunctions";
import { toast } from "sonner";

export const UserProfile = () => {
  const { id } = useParams();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserbyId(id),
  });

  if (isLoading)
    return <div className="text-center py-8">Loading profile...</div>;
  if (error)
    return (
      <div className="text-center py-8 text-red-500">Error loading profile</div>
    );

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Card className="shadow-lg">
        <CardHeader className="border-b pb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>
                {user.firstName.charAt(0)}
                {user.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold">
                {user.firstName} {user.lastName}
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                <Badge variant="secondary" className="capitalize">
                  {user.roles[0]}
                </Badge>
                {user.specialization && (
                  <Badge variant="outline">{user.specialization}</Badge>
                )}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="grid gap-6 py-6">
          {/* Basic Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </h2>
              <div className="space-y-3 pl-7">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{user.phoneNumber || "Not provided"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {format(new Date(user.dateOfBirth), "MMMM d, yyyy")} •{" "}
                    {Math.floor(
                      (new Date() - new Date(user.dateOfBirth)) /
                        (1000 * 60 * 60 * 24 * 365)
                    )}{" "}
                    years old
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{user.address || "Address not provided"}</span>
                </div>
              </div>
            </div>

            {/* Professional Info (for doctors) */}
            {user.roles.includes("doctor") && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Stethoscope className="h-5 w-5" />
                  Professional Information
                </h2>
                <div className="space-y-3 pl-7">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Specialization:
                    </span>
                    <span className="font-medium">{user.specialization}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      License Number:
                    </span>
                    <span className="font-medium">{user.licenseNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Years of Experience:
                    </span>
                    <span className="font-medium">
                      {user.yearsOfExperience || "Not specified"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Medical Info (for patients) */}
          {user.roles.includes("patient") && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <ClipboardList className="h-5 w-5" />
                Medical Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-7">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Blood Type:</span>
                    <span className="font-medium">
                      {user.bloodType || "Not specified"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Allergies:</span>
                    <span className="font-medium">
                      {user.allergies?.join(", ") || "None reported"}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Insurance Provider:
                    </span>
                    <span className="font-medium">
                      {user.insuranceProvider || "None"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Policy Number:
                    </span>
                    <span className="font-medium">
                      {user.insurancePolicyNumber || "None"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-end gap-2 border-t pt-4">
          <Button variant="outline">Edit Profile</Button>
          <Button onClick={() => toast.success("Profile updated successfully")}>
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
