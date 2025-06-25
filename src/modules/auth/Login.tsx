"use client"


import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs } from "@/components/ui/tabs"
import { TabsLogin } from "@/modules/auth/components/TabsLogin"
import { HeaderLogin } from "@/modules/auth/components/HeaderLogin"
import { FormLogin } from "@/modules/auth/components/FormLogin"
import { FormRegister } from "@/modules/auth/components/FormRegister"

export default function Login() {
    const [isLoading, setIsLoading] = useState(false)


    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <HeaderLogin />
                <CardContent>
                    <Tabs defaultValue="login" className="w-full">
                        <TabsLogin />
                        <FormLogin />
                        <FormRegister setIsLoading={setIsLoading} />
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}

