import Image from "next/image";

export default function Bio() {
  return (
    <>
      <div className="border-neon-green">
        <h1>Bio</h1>{" "}
        <Image
          src="/vft.jpg"
          alt="Venus Fly Trap"
          width={300}
          height={300}
          className="float-left px-4 mt-2"
        />
        <p className="mx-4 ">
          Hey there, my name is Ryan and I am an avid collector of carnivorous
          and exotic plants. Like many others, as a kid, I loved the novelty and
          magic of a Venus Fly Trap and I was so excited when I found one at the
          hardware store. Also like many others, it died in my care after about
          a week or so because I didn't understand how they actually worked.
          Fast forward, I was getting really into growing bonsai tree material
          and had an experimental grow area indoors(actually researched this
          time) but I had this trouble with gnats in the soil. I decided I
          wanted to have a creative solution so I looked into carnivorous
          plants, this time a pinguicula and I made sure to do my research. I
          was fascinated by that plant and its curious way of trapping insects.
          I was hooked. I purchased another one, then looked into sundews before
          finally revisiting flytraps. By then, I learned several other
          things(such as which plants were suitable indoors, how to fertilize,
          soil composition) and my view on the plants changed. I wanted to try
          to grow the best plants I possibly could. I dove headfirst into books,
          articles, and forums and would connect would many prolific growers as
          my collection continued to grow. I thought of what growing meant to me
          and the magic I felt while watching these tiny plants grow and mature
          and a sense of pride knowing that it was due to hard work and love.
        </p>
        <p className="m-4">
          I wanted to share that magic with others and it led to the creation of
          this site. I'm a novice web developer and this site I intend to
          develop and incorporate new features as my skills grow. I want this to
          be more than just a plant store. I want it to be a hub of sorts where
          people can get useful information and help with problems that occur
          while growing. Carnivorous plants are sometimes delicate but a lot of
          it has to do with basic knowledge. I want this site to be a source for
          growers to communicate with each other as well and share in the
          experience. I have many ideas for how I want this site to be. I will
          have a blog where it documents the status of development and other
          interesting things. I hope you guys stay tuned and thank you for
          reading.
        </p>
        <p className="m-4 text-end">Ryan</p>
      </div>
    </>
  );
}
