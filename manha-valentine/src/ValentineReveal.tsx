const YOUTUBE_EMBED = "https://www.youtube.com/embed/rppG35IGBp4?autoplay=1";
const CAT_IMAGE = "./src/assets/images/gnocchi.png";

export default function ValentineReveal() {
  return (
    <div className="reveal">
      <div className="reveal__card">
        <h1 className="reveal__title">Happy Valentine&apos;s Day</h1>
        <img
          src={CAT_IMAGE}
          alt="A cat"
          className="reveal__cat"
        />
        <div className="reveal__video-wrap">
          <iframe
            src={YOUTUBE_EMBED}
            title="Valentine song"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="reveal__video"
          />
        </div>
      </div>
    </div>
  );
}
