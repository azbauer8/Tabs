"use client"

import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { PlusIcon } from "@radix-ui/react-icons"
import { Button, Heading, Popover, Text, TextField } from "@radix-ui/themes"
import { useState } from "react"
import { useFormStatus } from "react-dom"
import { createGroup } from "./action"
import { schema } from "./schema"

export function CreateGroup() {
	const [dialogOpen, setDialogOpen] = useState(false)

	const [form, fields] = useForm({
		onValidate({ formData }) {
			return parseWithZod(formData, { schema })
		},
	})

	return (
		<Popover.Root open={dialogOpen} onOpenChange={setDialogOpen}>
			<Popover.Trigger>
				<Button variant="soft" color="blue">
					<PlusIcon /> Create Group
				</Button>
			</Popover.Trigger>
			<Popover.Content className="w-96 max-w-full" align="end">
				<Heading size="4">Create Group</Heading>

				<form
					id={form.id}
					onSubmit={form.onSubmit}
					action={async (formData) => {
						const res = await createGroup(formData)
						if (typeof res === "boolean" && res === true) {
							setDialogOpen(false)
						}
					}}
					noValidate
				>
					<div className="flex flex-col gap-2 mt-4">
						<Text
							as="label"
							htmlFor={fields.title.name}
							size="2"
							weight="medium"
						>
							Title
						</Text>
						<TextField.Root
							required
							placeholder="Group Title"
							key={fields.title.key}
							id={fields.title.name}
							name={fields.title.name}
						/>
						<Text className="text-red-10 txt">{fields.title.errors}</Text>
					</div>
					<div className="flex items-center gap-3 mt-4 justify-end">
						<CreateButton />
					</div>
				</form>
			</Popover.Content>
		</Popover.Root>
	)
}

function CreateButton() {
	const { pending } = useFormStatus()

	return (
		<Button type="submit" loading={pending} variant="soft">
			Create
		</Button>
	)
}
