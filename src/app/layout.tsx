import '@/styles/app.scss'

export const metadata = {
    title: 'Larry',
    description:
        'Your personal web keeper to save, organize and share your links.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="fr">
            <body>{children}</body>
        </html>
    )
}
