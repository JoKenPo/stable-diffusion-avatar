import * as url from 'url';

class StableDiffusion {
  constructor() {
    this.sdServerURL = `https://api.stability.ai`;
    this.engineId = 'stable-diffusion-512-v2-1'
  }
  
  buildURL(path) {
    const u = new url.URL(this.sdServerURL);
    u.pathname = path;
    return u
  }

  async generate(data) {
    const apiUrl = this.buildURL(`/v1beta/generation/${this.engineId}/text-to-image`);
    
    const body = JSON.stringify(data);

    // console.log(body)

    const response = await fetch(apiUrl.href, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `${process.env.API_KEY}`
      },
      body: body,
    });


    if (!response.ok) {
      throw new Error(`Failed to fetch response: ${response.status} ${response.text}`);
    }

    const res = await response.json();
    return res ;
  }
}

export async function Generate(data) {
  return new StableDiffusion().generate(data);
}
