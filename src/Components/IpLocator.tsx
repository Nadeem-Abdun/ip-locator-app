import React, { useState, useEffect } from 'react'
import { Box, Card, Stack, Typography, InputBase, IconButton } from '@mui/material'
import SearchTwoTone from '@mui/icons-material/SearchTwoTone'
import axios from 'axios';

interface IpData {
    ip: string;
    version: string;
    city: string;
    region: string;
    country_name: string;
    postal: string;
    latitude: number;
    longitude: number;
}

export default function IpLocator() {
    const [ipValue, setIpValue] = useState<string>('')
    const [objData, setObjData] = useState<IpData>({ ip: '', version: '', city: '', region: '', country_name: '', postal: '', latitude: 0, longitude: 0 })
    const [backgroundUrl, setBackgroundUrl] = useState('');
    const API = `https://ipapi.co/${ipValue}/json/`

    const handleIpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let ipVal = event.target.value
        setIpValue(ipVal);
    }

    const handleIpSearchClick = async () => {
        try {
            const response = await axios.get<IpData>(API)
            const resData = response.data
            setObjData(resData)
        } catch (error: unknown) {
            console.log(error)
        }
    }

    const handleEnterKey = (event: any) => {
        if (event.key === 'Enter') {
            handleIpSearchClick();
        }
    }

    useEffect(() => {
        const UNSPLASH_API_KEY = '7j3vzG4KdBIXFwcbRQLNt-bxMuYEkQM3GkYoB2g-hbU';
        const UNSPLASH_API_URL = `https://api.unsplash.com/search/photos?query=${objData.region}&client_id=${UNSPLASH_API_KEY}`;
        const fetchImg = async (UNSPLASH_API_URL: string) => {
            const unsplashResponse = await axios.get(UNSPLASH_API_URL);
            const imageUrl = unsplashResponse.data.results[0].urls.regular;
            setBackgroundUrl(imageUrl);
        }
        fetchImg(UNSPLASH_API_URL)
    }, [objData])

    return (
        <Box height='100%' width='100%' display='flex' justifyContent='center' alignItems='center' sx={{ backgroundImage: `url(${backgroundUrl})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%' }}>
            <Box sx={{ height: { xs: '70%', sm: '70%', md: '70%', lg: '75%', xl: '75%' }, width: { xs: '80%', sm: '70%', md: '60%', lg: '40%', xl: '40%' } }} display='flex' justifyContent='center' alignItems='center'>
                <Card sx={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: '#fafafa', borderRadius: '2rem', boxShadow: 24 }}>
                    <Stack height='100%' width='100%' direction='column' spacing={1} display='flex' justifyContent='center' alignItems='center' paddingX={3} paddingY={1}boxSizing='border-box'>
                        <Box height='12%' width='100%' display='flex' justifyContent='center' alignItems='center'>
                            <Typography component='h1' fontSize='2rem' fontWeight='600' fontFamily='Poppins'>IP Locator</Typography>
                        </Box>
                        <Stack height='12%' width='100%' direction='row' display='flex' justifyContent='center' alignItems='center' paddingX={1} boxSizing='border-box'>
                            <InputBase placeholder='Search Your IP...' value={ipValue} onChange={handleIpChange} onKeyDown={handleEnterKey} sx={{ bgcolor: '#f1f2f4', paddingX: '1rem', paddingY: '0.5rem', borderRadius: 4 }} fullWidth />
                            <IconButton onClick={handleIpSearchClick}><SearchTwoTone sx={{ fontSize: '2rem' }} /></IconButton>
                        </Stack>
                        <Stack height='76%' width='100%' direction='row' display='flex' justifyContent='center' alignItems='center' paddingX={1} paddingY={1} boxSizing='border-box'>
                            <Stack height='100%' width='50%' direction='column' spacing={1.8} display='flex' justifyContent='flex-start' alignItems='flex-start'>
                                <Typography component='h2' fontSize='1rem' fontWeight='600' fontFamily='Poppins' noWrap={true}>IP Address:</Typography>
                                <Typography component='h2' fontSize='1rem' fontWeight='600' fontFamily='Poppins' noWrap={true}>Version:</Typography>
                                <Typography component='h2' fontSize='1rem' fontWeight='600' fontFamily='Poppins' noWrap={true}>City:</Typography>
                                <Typography component='h2' fontSize='1rem' fontWeight='600' fontFamily='Poppins' noWrap={true}>Region:</Typography>
                                <Typography component='h2' fontSize='1rem' fontWeight='600' fontFamily='Poppins' noWrap={true}>Country:</Typography>
                                <Typography component='h2' fontSize='1rem' fontWeight='600' fontFamily='Poppins' noWrap={true}>Postal:</Typography>
                                <Typography component='h2' fontSize='1rem' fontWeight='600' fontFamily='Poppins' noWrap={true}>Latitude:</Typography>
                                <Typography component='h2' fontSize='1rem' fontWeight='600' fontFamily='Poppins' noWrap={true}>Longitude:</Typography>
                            </Stack>
                            <Stack height='100%' width='50%' direction='column' spacing={1.8} display='flex' justifyContent='flex-start' alignItems='flex-start'>
                                <Typography component='h2' fontSize='1rem' fontWeight='500' fontFamily='Poppins' noWrap={true}>{objData.ip ? objData.ip : '-'}</Typography>
                                <Typography component='h2' fontSize='1rem' fontWeight='500' fontFamily='Poppins' noWrap={true}>{objData.version ? objData.version : '-'}</Typography>
                                <Typography component='h2' fontSize='1rem' fontWeight='500' fontFamily='Poppins' noWrap={true}>{objData.city ? objData.city : '-'}</Typography>
                                <Typography component='h2' fontSize='1rem' fontWeight='500' fontFamily='Poppins' noWrap={true}>{objData.region ? objData.region : '-'}</Typography>
                                <Typography component='h2' fontSize='1rem' fontWeight='500' fontFamily='Poppins' noWrap={true}>{objData.country_name ? objData.country_name : '-'}</Typography>
                                <Typography component='h2' fontSize='1rem' fontWeight='500' fontFamily='Poppins' noWrap={true}>{objData.postal ? objData.postal : '-'}</Typography>
                                <Typography component='h2' fontSize='1rem' fontWeight='500' fontFamily='Poppins' noWrap={true}>{objData.latitude ? objData.latitude : '-'}</Typography>
                                <Typography component='h2' fontSize='1rem' fontWeight='500' fontFamily='Poppins' noWrap={true}>{objData.longitude ? objData.longitude : '-'}</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Card>
            </Box>
        </Box>
    )
}
