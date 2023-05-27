import cheerio from 'cheerio'

export default async function getPageMetadata(pageUrl: string) {
    const response = await fetch(pageUrl)
    const html = await response.text()
    const $ = cheerio.load(html)

    const title = $('title').text()
    const web_src = $('meta[property="og:image"]').attr('content')
    const url = response.url

    return {
        title,
        web_src,
        url,
    }
}
