import json
from PIL import Image, ImageDraw

class NFTGenerator:
  images_CID = "bafybeievx3ueakjyio3py525kpeqjzs2i4dgnqcke4swoys7im4zuyi4rm"
  colors = {
    "white":  "#ffffff", # white
    "red":    "#ba181b", # red
    "green":  "#70e000", # green
    "gold":   "#ffa200", # gold
    "blue":   "#227c9d", # blue
    "brown":  "#582f0e", # brown
  }

  def generate_metadata(self, image_id: int, head_color: str, body_color: str, arms_color: str):
    metadata_file = open(f'metadata/{image_id}', 'w')
    images_number = len(self.colors) ** 3 - 1
    image_metadata = {
      "image": f"ipfs://{self.images_CID}/{image_id}.jpg",
      "tokenId": image_id,
      "name": f"Life NFT #{image_id}",
      "description": f"One of the best NFTs on the market {image_id}/{images_number}",
      "edition": 1,
      "attributes": [
        {
          "trait_type": "Head Color",
          "value": head_color
        },
        {
          "trait_type": "Body Color",
          "value": body_color
        },
        {
          "trait_type": "Arms Color",
          "value": arms_color
        }
      ]
    }
    json.dump(obj=image_metadata, fp=metadata_file, indent=2)

  def generate_image(self, image_id: int, head_color: str, body_color: str, arms_color: str):
    image = Image.new(mode="RGB", size=(1000, 1000))
    draw = ImageDraw.Draw(image)
    # BACKGROUND
    draw.rectangle((0, 0) + image.size, fill="#fff5d1")
    # ARMS
    draw.polygon((500, 350) + (500, 450) + (150, 700) + (150, 600), fill=arms_color, outline="black")
    draw.polygon((500, 350) + (500, 450) + (850, 700) + (850, 600), fill=arms_color, outline="black")
    # BODY
    draw.rectangle((400, 250) + (600, 950), fill=body_color, outline="black")
    # HEAD
    draw.ellipse((300, 50) + (700, 450), fill=head_color, outline="black")
    # FACE
    face = Image.open('images/face.png')
    face.thumbnail((400, 400), Image.ANTIALIAS)
    image.paste(face, box=(330, 70), mask=face)

    image.save(f'images/LifeNFT/{image_id}.jpg')

  def generate_all_images(self):
    id = 0
    for head in self.colors.keys():
      for body in self.colors.keys():
        for arms in self.colors.keys():
          self.generate_image(id, self.colors[head], self.colors[body], self.colors[arms])
          print(id)
          id += 1
          
  def generate_all_metadatas(self):
    all_traits_output = open('metadata/all-traits', 'w')
    all_traits = []
    id = 0
    for head in self.colors.keys():
      for body in self.colors.keys():
        for arms in self.colors.keys():
          self.generate_metadata(id, head, body, arms)
          all_traits.append(
            {
              "head": head,
              "body": body,
              "arms": arms,
              "tokenId": id
            }
          )
          print(id)
          id += 1
    
    json.dump(obj=all_traits, fp=all_traits_output, indent=2)

nft = NFTGenerator()
nft.generate_all_metadatas()