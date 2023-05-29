'use client'

import { useState, useEffect } from 'react'

import Larry from '@/components/UI/Larry'
import supabase from '@/lib/supabase/client'
import { Database } from '@/lib/supabase/types.spec'

export default function TabPageEdit({ params }: { params: any }) {
    const [image, setImage] = useState()
    const [page, setPage] = useState(
        null as Database['public']['Tables']['pages']['Row'] | null
    )
    const [pageData, setPageData] = useState({
        title: '',
        short_desc: '',
        web_src: '' as string | null,
    })

    const handleImageUpload = (event: any) => {
        if (event.target.files && event.target.files.length > 0) {
            const uploadedImage = event.target.files[0]
            setImage(uploadedImage)
        }
    }

    const getPage = async () => {
        const { data, error } = await supabase
            .from('pages')
            .select('*')
            .eq('id', params.id)
            .single()

        if (error) {
            throw error
        }

        setPage(data)
    }

    const checkImage = async (filePath: string) => {
        const { data, error } = await supabase.storage
            .from('public')
            .list(filePath)

        if (error) {
            return false
        }

        return true
    }

    const updatePage = async (event: any) => {
        event.preventDefault()

        await (async () => {
            if (image) {
                let uploadedImage = await uploadImage(page!.id, image)
                console.log(uploadedImage)

                setPageData({
                    title: event.target[1].value,
                    short_desc: event.target[2].value,
                    web_src: uploadedImage.publicUrl,
                })
            } else {
                setPageData({
                    title: event.target[1].value,
                    short_desc: event.target[2].value,
                    web_src: page!.web_src,
                })
            }
        })()

        const { error } = await supabase
            .from('pages')
            .update(pageData)
            .eq('id', page!.id)

        if (error) {
            throw new Error(error.message)
        }

        getPage()
    }

    const uploadImage = async (idPage: number, image: any) => {
        const fileExtension = image.name.split('.').pop().toLowerCase()
        const fileName = `${idPage}.${fileExtension}`
        const alreadyExists = await checkImage(`pages/${fileName}`)

        if (alreadyExists) {
            let { data, error } = await supabase.storage
                .from('public')
                .update(`pages/${fileName}`, image, {
                    upsert: true,
                })

            if (error) {
                throw new Error(error.message)
            }
        } else {
            let { data, error } = await supabase.storage
                .from('public')
                .upload(`pages/${fileName}`, image, {
                    upsert: false,
                })

            if (error) {
                throw new Error(error.message)
            }
        }

        const { data } = supabase.storage
            .from('public')
            .getPublicUrl(`pages/${fileName}`)

        return data
    }

    useEffect(() => {
        getPage()
    }, [])

    return (
        <div className="flex flex-col pt-3 pb-18">
            <div className="flex flex-col items-center text-center mb-4">
                <div className="w-2/3 aspect-square mb-1">
                    <Larry svgId="coffee" />
                </div>
                <h1 className="text-20 font-medium col-span-5 text-center pb-4 border-b border-gray-200">
                    Èditer la page {page?.title}
                </h1>
            </div>
            <form
                action="#"
                onSubmit={(e) => updatePage(e)}
                className="px-2 form form--page-edit"
            >
                <div className="form__field">
                    <label>Image :</label>
                    <input
                        id="imageField"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        hidden
                    />
                    <div
                        className="w-full aspect-[3/2] bg-cover bg-no-repeat bg-center rounded-[1.2rem]"
                        style={{
                            backgroundImage: `url(${
                                image
                                    ? URL.createObjectURL(image)
                                    : page?.web_src
                            })`,
                        }}
                        onClick={() =>
                            document.getElementById('imageField')?.click()
                        }
                    />
                </div>
                <div className="form__field">
                    <label>Titre :</label>
                    <textarea rows={3} defaultValue={page?.title ?? ''} />
                </div>
                <div className="form__field">
                    <label>Description :</label>
                    <textarea rows={3} defaultValue={page?.short_desc ?? ''} />
                </div>
                <input
                    type="submit"
                    value="Enregistrer"
                    className="button w-full"
                />
            </form>
        </div>
    )
}
