
import { Session } from "next-auth";
import { signIn } from "next-auth/react";

export const CheckIfAdmin = (sessionData: Session | null) => {
    if (sessionData?.user?.role != "admin") {
        void signIn();
    }
}

