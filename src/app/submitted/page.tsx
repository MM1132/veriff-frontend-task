"use client"
import { Button, Card, Typography } from "@mui/material"
import { Stack } from "@mui/system"
import { useRouter } from "next/navigation"

export default function Page() {
  const router = useRouter()

  const clickHandler = () => {
    router.push("/")
  }

  return (
    <>
      <Card sx={{ m: 2 }}>
        <Stack sx={{ p: 2 }} gap={2} direction="column" alignItems="center">
          <Card sx={{ p: 3 }}>
            <Typography sx={{ fontStyle: "italic" }} variant="h3">
              You made it! :)
            </Typography>
          </Card>
          <Button size="large" variant="contained" onClick={clickHandler}>
            Fill the amazing form again
          </Button>
        </Stack>
      </Card>
    </>
  )
}
