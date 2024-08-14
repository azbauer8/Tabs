"use client"

import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { PlusIcon } from "@radix-ui/react-icons"
import { Button, Heading, Popover, Text, TextField } from "@radix-ui/themes"
import { useState } from "react"
import { useFormStatus } from "react-dom"
import { createTab } from "./action"
import { schema } from "./schema"

export function CreateTab() {
	const [dialogOpen, setDialogOpen] = useState(false)

	const [form, fields] = useForm({
		onValidate({ formData }) {
			return parseWithZod(formData, { schema })
		},
	})

	return (
		<Popover.Root open={dialogOpen} onOpenChange={setDialogOpen}>
			<Popover.Trigger>
				<Button variant="soft">
					<PlusIcon /> Create Tab
				</Button>
			</Popover.Trigger>
			<Popover.Content className="w-96 max-w-full" align="end">
				<Heading size="4">Create Tab</Heading>
				<Text size="2">
					Paste the links for the tab and Spotify track you want to save below.
				</Text>

				<form
					id={form.id}
					onSubmit={form.onSubmit}
					action={async (formData) => {
						const res = await createTab(formData)
						if (typeof res === "boolean" && res === true) {
							setDialogOpen(false)
						}
					}}
					noValidate
				>
					<div className="flex flex-col gap-2 mt-4">
						<Text
							as="label"
							htmlFor={fields.tabURL.name}
							size="2"
							weight="medium"
						>
							Tab
						</Text>
						<TextField.Root
							required
							placeholder="Tab URL"
							key={fields.tabURL.key}
							id={fields.tabURL.name}
							name={fields.tabURL.name}
						/>
						<Text className="text-red-10 txt">{fields.tabURL.errors}</Text>
						<Text
							as="label"
							htmlFor={fields.trackURL.name}
							size="2"
							weight="medium"
						>
							Spotify Track
						</Text>
						<TextField.Root
							required
							placeholder="Track URL"
							key={fields.trackURL.key}
							id={fields.trackURL.name}
							name={fields.trackURL.name}
						/>
						<Text className="text-red-10 text-2">{fields.trackURL.errors}</Text>
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
