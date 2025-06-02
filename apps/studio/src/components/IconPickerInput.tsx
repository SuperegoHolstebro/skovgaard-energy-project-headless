import { useState } from 'react'
import { PatchEvent, set } from 'sanity'
import { Box, Grid, Stack, TextInput } from '@sanity/ui'
import Icon from './Icons'

const IconPickerInput = ({ value, onChange, type }: any) => {
    const icons = [
        { title: 'Igen ikon', value: 'empty' },
        { title: "Lokation", value: "Lokation" },
        { title: "Strategi", value: "Strategi" },
        { title: "Miljø", value: "Miljø" },
        { title: "Kalender", value: "Kalender" },
        { title: "Kurve", value: "Kurve" },
        { title: 'Rakat', value: 'Rakat' },
        { title: 'Solenergi', value: 'Solenergi' },
        { title: 'Vindenergi', value: 'Vindenergi' },
        { title: 'Insekter', value: 'Insekter' },
        { title: 'Genbrug', value: 'Genbrug' },
        { title: 'Mad', value: 'Mad' },
        { title: 'Planlægning', value: 'Planlægning' },
        { title: 'Tid', value: 'Tid' },
        { title: 'Præsentation', value: 'Præsentation' },
        { title: 'Jorden', value: 'Jorden' },
        { title: 'Tjek', value: 'Tjek' },
        { title: 'Business', value: 'Business' },
        { title: 'Lyd', value: 'Lyd' },
        { title: 'Strøm', value: 'Strøm' },
        { title: 'Ingeniør', value: 'Ingeniør' },
        { title: 'Vej', value: 'Vej' },
        { title: 'Borger', value: 'Borger' },
        { title: 'Trafik', value: 'Trafik' },
        { title: 'Service', value: 'Service' },
        { title: 'Info', value: 'Info' },
        { title: 'Vand', value: 'Vand' },
        { title: 'Download', value: 'Download' },
        { title: 'Fil', value: 'Fil' },
        { title: 'Link', value: 'Link' },
        { title: 'Eksternt', value: 'Eksternt' },
    ]

    const [searchQuery, setSearchQuery] = useState('')

    const handleClick = (value: any) => {
        onChange(PatchEvent.from(set(value)))
    }

    const filteredIcons = icons.filter((icon) =>
        icon.title.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    return (
        <Stack space={3}>
            <Box>
                <TextInput
                    type="text"
                    className="w-full"
                    placeholder="Søg efter ikon..."
                    value={searchQuery}
                    onChange={(event) =>
                        setSearchQuery(event.currentTarget.value)
                    }
                />
            </Box>
            <Box>
                <Grid
                    columns={5}
                    gap={2}
                >
                    {filteredIcons.map((icon) => (
                        <button
                            key={icon.value}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '0.375rem',
                                background: value === icon.value ? '#6FCF97' : '#fff',
                                aspectRatio: '1 / 1',
                                width: '100%',
                                border: '1px solid rgba(0,0,0,0.2)',
                                borderRadius: '0.375rem',
                                boxShadow: value === icon.value ? '0 4px 12px rgba(0,0,0,0.15)' : undefined,
                                transition: 'background 0.2s, box-shadow 0.2s',
                                cursor: 'pointer',
                            }}
                            onClick={() => handleClick(icon.value)}
                            onMouseEnter={e => {
                                if (value !== icon.value) {
                                    (e.currentTarget as HTMLButtonElement).style.background = '#e6f9ef'
                                }
                            }}
                            onMouseLeave={e => {
                                if (value !== icon.value) {
                                    (e.currentTarget as HTMLButtonElement).style.background = '#fff'
                                }
                            }}
                        >
                            <Icon
                                className=""
                                type={icon.value}
                                style={{
                                    width: '1rem',
                                    height: '1rem',
                                    fill: '#222',
                                }}
                            />
                            <span
                                style={{
                                    display: 'block',
                                    width: '100%',
                                    textAlign: 'center',
                                    marginTop: '0.25rem',
                                    fontSize: '0.875rem',
                                }}
                            >
                                {icon.title}
                            </span>
                        </button>
                    ))}
                </Grid>
            </Box>
        </Stack>
    )
}

export default IconPickerInput
