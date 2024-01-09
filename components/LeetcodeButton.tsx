"use client"

import { Button, useDisclosure } from "@nextui-org/react"

export default function LeetcodeButton() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  return (
    <>
      <Button onPress={onOpen}>Connect Leetcode</Button>
    </>
  )
}