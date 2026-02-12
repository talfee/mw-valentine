const YOUTUBE_EMBED = "https://www.youtube.com/embed/rppG35IGBp4?autoplay=1";

export default function ValentineReveal() {
  return (
    <div className="reveal">
      <div className="reveal__card">
        <h1 className="reveal__title">happy valentine&apos;s day pookiee</h1>
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
