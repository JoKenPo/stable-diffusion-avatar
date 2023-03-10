import { Generate } from '../services/stable-diffusion.js';

export default class Avatar {

  async renderImage(req, res) {
    const { hash } = req.params;

    const { prompt, seed } = this.hallucinatePrompt(hash);

    try {
      const imageReq = {
        text_prompts: [
          {text: `masterpiece, best quality, ${prompt}`, weight: 1},
          {
            text: 
            "person in distance, worst quality, low quality, medium quality, deleted, lowres, comic, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, jpeg artifacts, signature, watermark, username, blurry",
            weight: -1
          }
        ],
        seed,
        sampler: "K_DPMPP_2M",
        steps: 20,
        cfg_scale: 7,
        // clip_guidance_preset: 'FAST_BLUE',
        height: 512,
        width: 512,
        samples: 1,
      };

      const imgs = await Generate(imageReq);

      const imgData = imgs.artifacts[0];
      const buffer = await Buffer.from(imgData.base64,"base64");

      res.contentType("image/jpeg");
      res.status(200).send(buffer);
    } catch (error) {
      res
        .status(500)
        .send("candont render image, sorry");
    }
  }

  hallucinatePrompt(hash) {
    const sb = [];
    if (hash[0] > '0' && hash[0] <= '5') {
      sb.push("1girl")
    } else {
      sb.push("1guy")
    }
  
    switch (hash[1]) {
    case '0': case '1': case '2': case '3':
      sb.push("blonde")
    case '4': case '5': case '6': case '7':
      sb.push("brown hair")
    case '8': case '9': case 'a': case 'b':
      sb.push("red hair")
    case 'c': case 'd': case 'e': case 'f':
      sb.push("black hair")
    default:
    }
  
    if (hash[2] > '0' && hash[2] <= '5') {
      sb.push("coffee shop")
    } else {
      sb.push("landscape, outdoors")
    }
  
    if (hash[3] > '0' && hash[3] <= '5') {
      sb.push("hoodie")
    } else {
      sb.push("sweatsuit")
    }
  
    switch (hash[4]) {
    case '0': case '1': case '2': case '3':
      sb.push("<lora:cdi:1>")
    case '4': case '5': case '6': case '7':
      sb.push("breath of the wild")
    case '8': case '9': case 'a': case 'b':
      sb.push("genshin impact")
    case 'c': case 'd': case 'e': case 'f':
      sb.push("arknights")
    default:
    }
  
    if (hash[5] > '0' && hash[5] <= '5') {
      sb.push("watercolor")
    } else {
      sb.push("matte painting")
    }
  
    switch (hash[6]) {
    case '0': case '1': case '2': case '3':
      sb.push("highly detailed")
    case '4': case '5': case '6': case '7':
      sb.push("ornate")
    case '8': case '9': case 'a': case 'b':
      sb.push("thick lines")
    case 'c': case 'd': case 'e': case 'f':
      sb.push("3d render")
    default:
    }
  
    switch (hash[7]) {
    case '0': case '1': case '2': case '3':
      sb.push("short hair")
    case '4': case '5': case '6': case '7':
      sb.push("long hair")
    case '8': case '9': case 'a': case 'b':
      sb.push("ponytail")
    case 'c': case 'd': case 'e': case 'f':
      sb.push("pigtails")
    default:
    }
  
    switch (hash[8]) {
    case '0': case '1': case '2': case '3':
      sb.push("smile")
    case '4': case '5': case '6': case '7':
      sb.push("frown")
    case '8': case '9': case 'a': case 'b':
      sb.push("laughing")
    case 'c': case 'd': case 'e': case 'f':
      sb.push("angry")
    default:
    }
  
    switch (hash[9]) {
    case '0': case '1': case '2': case '3':
      sb.push("sweater")
    case '4': case '5': case '6': case '7':
      sb.push("tshirt")
    case '8': case '9': case 'a': case 'b':
      sb.push("suitjacket")
    case 'c': case 'd': case 'e': case 'f':
      sb.push("armor")
    default:
    }
  
    switch (hash[10]) {
    case '0': case '1': case '2': case '3':
      sb.push("blue eyes")
    case '4': case '5': case '6': case '7':
      sb.push("red eyes")
    case '8': case '9': case 'a': case 'b':
      sb.push("brown eyes")
    case 'c': case 'd': case 'e': case 'f':
      sb.push("hazel eyes")
    default:
    }
  
    // Raro
    if (hash[11] == '0') {
      sb.push("heterochromia")
    }
  
    switch (hash[12]) {
    case '0': case '1': case '2': case '3':
      sb.push("morning")
    case '4': case '5': case '6': case '7':
      sb.push("afternoon")
    case '8': case '9': case 'a': case 'b':
      sb.push("evening")
    case 'c': case 'd': case 'e': case 'f':
      sb.push("nighttime")
    default:
    }
  
    // Rara
    if (hash[13] == '0') {
      sb.push(" art by Akira Toriyama")
    }
  
    switch (hash[14]) {
    case '0': case '1': case '2': case '3':
      sb.push("vtuber")
    case '4': case '5': case '6': case '7':
      sb.push("anime")
    case '8': case '9': case 'a': case 'b':
      sb.push("studio ghibli")
    case 'c': case 'd': case 'e': case 'f':
      sb.push("cloverworks")
    default:
    }

    const seedPortion = hash.slice(-9, -1)
    const seed = parseInt(seedPortion, 16) || Math.floor(Math.random() * 1000000);
  
    return {prompt: sb.toString(), seed}
  }
}