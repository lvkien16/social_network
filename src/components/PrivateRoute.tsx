"use client";

import { useAppSelector } from "@/redux/store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
    const { currentUser } = useAppSelector(state => state.user);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (!currentUser && !pathname.startsWith("/auth")) {
            router.push("/auth/login");
        }
    }, [pathname, currentUser]);
    return <>{children}</>
}
