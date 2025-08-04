function extractIframeSrc(html){
    const match = html.match(/<iframe[^>]+src=["']([^"']+)["']/);
    return match ? match[1] : null;
}

module.exports = {extractIframeSrc};