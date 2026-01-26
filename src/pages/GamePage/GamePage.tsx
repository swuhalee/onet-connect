import { Box } from "@mui/material"
import { useTranslation } from "react-i18next"
import OnetWebView from "./components/OnetWebView"

const GamePage = () => {
    const { t } = useTranslation()

    return (
        <>
            <title>{t('meta.game.title')}</title>
            <meta name="description" content={t('meta.game.description')} />
            <meta name="keywords" content="onet, connect, puzzle, game, matching, tiles" />
            <meta property="og:title" content={t('meta.game.title')} />
            <meta property="og:description" content={t('meta.game.description')} />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="/og-image.png" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={t('meta.game.title')} />
            <meta name="twitter:description" content={t('meta.game.description')} />
            <meta name="twitter:image" content="/og-image.png" />

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    width: '100%',
                    overflowX: 'auto',
                    padding: { xs: '20px', sm: 0 },
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                }}
            >
                <OnetWebView />
            </Box>
        </>
    )
}

export default GamePage