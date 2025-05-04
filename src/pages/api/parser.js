import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Check for security token
  const authToken = req.headers['x-secure-token'];
  if (!authToken || authToken !== process.env.SECURE_TOKEN) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const { html, tag, filterMedia = false } = req.body;

    if (!html || !tag) {
      return res.status(400).json({ 
        message: 'Both html and tag parameters are required' 
      });
    }

    // Load the HTML content
    const $ = cheerio.load(html);

    // Find all elements matching the tag
    const elements = $(tag);

    if (elements.length === 0) {
      return res.status(404).json({ 
        message: `No ${tag} elements found in the provided HTML` 
      });
    }

    // Extract HTML content of all matching elements
    const results = elements.map((_, element) => {
      const $element = $(element);
      
      if (filterMedia) {
        // Remove SVG elements
        $element.find('svg').remove();
        
        // Remove elements with base64 content
        $element.find('img[src^="data:"]').remove();
        
        // Remove background images with base64
        $element.find('[style*="data:"]').removeAttr('style');
      }
      
      return $element.toString();
    }).get();

    return res.status(200).json({
      count: results.length,
      elements: results
    });

  } catch (error) {
    console.error('Parser error:', error);
    return res.status(500).json({ 
      message: 'Error processing HTML content',
      error: error.message 
    });
  }
}