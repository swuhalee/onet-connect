import { Box } from "@mui/material"
import { useTranslation } from "react-i18next"
import OnetWebView, { isMobile } from "./components/OnetWebView"
import { OG_IMAGE_URL } from "../../configs/appUrl"

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
            <meta property="og:image" content={OG_IMAGE_URL} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={t('meta.game.title')} />
            <meta name="twitter:description" content={t('meta.game.description')} />
            <meta name="twitter:image" content={OG_IMAGE_URL} />

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    ...(!isMobile && {
                        '@media (max-width: 768px)': {
                            alignItems: 'flex-start',
                        },
                    }),
                    width: '100%',
                    boxSizing: 'border-box',
                    overflowX: isMobile ? 'hidden' : 'auto',
                    overflowY: 'hidden',
                }}
            >
                <OnetWebView />
            </Box>
        </>
    )
}

export default GamePage