fetch('https://www.youtube.com/@TV-ue9if')
  .then(res => res.text())
  .then(html => {
    const match = html.match(/channel\/(UC[^"]+)/);
    if (match) console.log(match[1]);
    else {
      const match2 = html.match(/channelId":"([^"]+)/);
      if (match2) console.log(match2[1]);
      else console.log('Still not found');
    }
  });
