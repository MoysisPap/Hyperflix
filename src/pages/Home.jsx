//components
import HeroBanner from "../components/pages-components/home/HeroBanner";
import Movies from "../components/pages-components/home/Movies";
//data 
import apiConfig from "../data/apiConfig";
//hooks 
import { useEffect, useState } from "react";

export default function Home() {
  const [movieList, setMovieList] = useState([]);
  const [movieBanner, setMovieBanner] = useState(null);

  useEffect(() => {
    const loadAll = async () => {

      //catching the lists 
      let list = await apiConfig.getHomeList();
      setMovieList(list)
      console.log(list)

      //Catching HeroBanner (random)
      //filter the first list setted on apiConfig
      let bannerToprated = list.filter(i => i.slug === 'toprated');
      //Math the list to be able to random the results of list
      let randomBanner = Math.floor(Math.random() * (bannerToprated[0].items.results.length - 1));
      // catch the specificly movie 
      let catchBanner = bannerToprated[0].items.results[randomBanner];
      //match the link of list and the link with more informations about the movie 
      let randomInformation = await apiConfig.getMovieForId(catchBanner.id);
      // change the state of hero banner 
      setMovieBanner(randomInformation);
    }
    loadAll();
  }, [])

  return (
      <main>
        <div>
          {movieBanner &&
            <HeroBanner itemBanner={movieBanner} />
          }
        </div>
        <div>
          {movieList.map((item, key)=>(
            <Movies key={key} title={item.title} items={item.items} />
          ))}
        </div>
      </main>
  );
}
