import classes from "./StartingPageContent.module.css";
import { useState, useEffect, useRef } from "react";

const StartingPageContent = () => {
  const rootMargin = "-100px";
  const [isIntersectingi,setIntersectingi] = useState(false);
  const [isIntersectingt,setIntersectingt] = useState(false);
  const [isIntersectingf,setIntersectingf] = useState(false);
  const imgClasses = `${classes.imgAnim} ${
    isIntersectingi ? classes.imgAnimanim : ""
  }`;
  const textflxClasses = `${classes.testFlex} ${
    isIntersectingt ? classes.testFlexanim : ""
  }`;
  const featureClasses = `${classes.featuresDiv} ${
    isIntersectingf ? classes.ftrdivanim : ""
  }`;
  const inputRefHand = useRef();
 
  const secondDiv = useRef();
  const featuresRef = useRef();
  const testRef = useRef();
  const [featureNum, setFeatureNum] = useState(0);
  const [subscribed, setSubscribed] = useState(false);
  const addMouseOverEvent = (e) => {
    const target = e.target;

    if (target.getAttribute('name') == 'featuresEach') {
      setFeatureNum(target.dataset.span);
    }
  };
    useEffect(()=>{
      const observer = new IntersectionObserver(([entry])=>{
        console.log(entry);
        console.log(entry.target.className);
        if (entry.target.className.includes('mainImgFlex'))
        {
          setIntersectingi(entry.isIntersecting);
        } else 
          if (entry.target.className.includes('featureOverall')) {
          setIntersectingf(entry.isIntersecting);
        }else 
        if (entry.target.className.includes('mainTest')) {
        setIntersectingt(entry.isIntersecting);
      }
        

      },{root:null,rootMargin,threshold:0});

      if(secondDiv.current){
        observer.observe(secondDiv.current);

      }
      if(testRef.current){
        observer.observe(testRef.current);

      }
      if(featuresRef.current){
        observer.observe(featuresRef.current);

      }
    
      return ()=>{
        if (secondDiv.current){
          observer.unobserve(secondDiv.current);
        }
        if(featuresRef.current){
          observer.unobserve(featuresRef.current);
  
        }
        if(testRef.current){
          observer.unobserve(testRef.current);
  
        }
      } 
    },[])

  const submitHandler = () => {
    setSubscribed(true);
  };
  const items = [1, 2, 3];
  const featuredesc = [
    "https://st3.depositphotos.com/3600009/36049/v/950/depositphotos_360492944-stock-illustration-trendy-color-discount-card-voucher.jpg",
    "https://image.shutterstock.com/image-photo/image-260nw-712964140.jpg",
    "https://i.pinimg.com/originals/f3/c1/b7/f3c1b7e4ded4aa735c11aee8835c6300.png",
  ];
  const [slideNum, setSlideNum] = useState(0);
  useEffect(() => {
    const timer = setTimeout(nextSlide, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [slideNum]);

  const nextSlide = () => {
    if (slideNum === 2) {
      setSlideNum(0);
    } else {
      setSlideNum(slideNum + 1);
    }
  };
  
  return (
    <section className={classes.starting}>
      <div className={classes.headingDiv}>
        <h1>
          When the <span className={classes.highlight}> hungry YOU</span> meets
          <br />
          <span className={classes.highlight}> the TRUCK!</span>
        </h1>
        {!subscribed && (
          <div className={classes.emailgrp}>
            <button onClick={submitHandler}>Subscribe For Updates</button>
            <input placeholder="Email address" ref={inputRefHand} />
          </div>
        )}
        {subscribed && (
          <div className={classes.emailgrpSub}>
            <span>
              <img src="https://as2.ftcdn.net/v2/jpg/03/10/70/79/500_F_310707936_iickgWF7S3Gd3EXm6pyFCKA7gYSzI5Tr.jpg" />
            </span>
            <span>We will update you for cool offers</span>
          </div>
        )}
      </div>
      <div className={classes.mainImgFlexSub}>
      <div  className={classes.imgAnimSub}>
            <h2>The partnership you can trust!</h2>
            <img src="https://image.freepik.com/free-vector/fast-mail-service-male-character-postman-drive-motorbike-supply-order-client-woman-isolated-white-cartoon-illustration_169479-1018.jpg" /></div>
       
        <div className={classes.testFlexSub}>
          <div className={classes.mainTestSub}> 
          <div className={classes.imgCircleSub}>
            
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWKhsDaHBKpuSLNP41a0WDeIx2o56OxoOlhQ&usqp=CAU" />
          <div className={classes.whoDiv}>
                <h6>Jinson John</h6>
                <p>CEO, Food Truck</p>
              </div>
          </div>
          <div className={classes.smallTest}></div>
          <div className={classes.bigTest}>
          <div className={classes.wordsDiv}>
              Be ready to witness quality food delivery services.This is the
              first <span>100% </span>clean and certified service.
              <br />
              This is my <span>PROMISE</span>.
              
            </div>
          </div>

          </div>
          
        </div>
        
      </div>

     <div className={classes.mainImgFlex} ref={secondDiv} style={{ opacity: `${isIntersectingi ? 1:0}` }}>
        
          <div  className={imgClasses} >
            <h2>The partnership you can trust!</h2>
            <img src="https://image.freepik.com/free-vector/fast-mail-service-male-character-postman-drive-motorbike-supply-order-client-woman-isolated-white-cartoon-illustration_169479-1018.jpg" /></div>
        
       <div className={textflxClasses}>
          <div className={classes.mainTest} ref={testRef}> 
          <div className={classes.imgCircle}>
            
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWKhsDaHBKpuSLNP41a0WDeIx2o56OxoOlhQ&usqp=CAU" />
          <div className={classes.whoDiv}>
                <h6>Jinson John</h6>
                <p>CEO, Food Truck</p>
              </div>
          </div>
          <div className={classes.smallTest}></div>
          <div className={classes.bigTest}>
          <div className={classes.wordsDiv}>
              Be ready to witness quality food delivery services.This is the
              first <span>100% </span>clean and certified service.
              <br />
              This is my <span>PROMISE</span>.
              
            </div>
          </div>

          </div>
          
        </div>
        
      </div> 
          <div ref={featuresRef} className={classes.featureOverall} style={{ opacity: `${isIntersectingf ? 1:0}` }}>
          <div className={featureClasses} >
        <div className={classes.featuresDivBtn} onMouseOver={addMouseOverEvent}>
          <div className={classes.featuresEach} name="featuresEach" data-span={0}>
            1000+ satisfied customers
          </div>
          <div className={classes.featuresEach} name="featuresEach" data-span={1}>
            100+ restaurants
          </div>
          <div className={classes.featuresEach} name="featuresEach" data-span={2}>
          Exciting offers
          </div>
        </div>
        {featuredesc.map((desc, ind) => {
          if (+featureNum === +ind) {
            // eslint-disable-next-line default-case
            switch (+featureNum) {
              case 0:
                return (
                  <div className={classes.firstfeature}>
                    <div className={classes.thirdIndFeature}>
                      <img src="https://kohinoorjoy.co.uk/wp-content/uploads/2020/01/indo-chinese-food.jpg" />
                      <div className={classes.thirdfeatureind}>
                        <h3>Chinese</h3>
                        <p>
                          The best Chinese food.Prepared with fresh suasage and
                          highly experienced chefs.
                        </p>
                      </div>
                    </div>
                    <div className={classes.thirdIndFeature}>
                      <img src="https://cdn.wallpapersafari.com/69/95/GsNcVt.jpg" />
                      <div className={classes.thirdfeatureind}>
                        <h3>Arabian</h3>
                        <p>
                          The best Chinese food.Prepared with fresh suasage and
                          highly experienced chefs.
                        </p>
                      </div>
                    </div>
                    <div className={classes.thirdIndFeature}>
                      <img src="https://i0.wp.com/vegecravings.com/wp-content/uploads/2017/04/paneer-butter-masala-recipe-step-by-step-instructions.jpg?fit=2592%2C1944&quality=65&strip=all&ssl=1" />
                      <div className={classes.thirdfeatureind}>
                        <h3>Indian</h3>
                        <p>
                          The best Chinese food.Prepared with fresh suasage and
                          highly experienced chefs.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  // <div className={classes.featuresCnt}>
                  //   <img src={featuredesc[ind]} />
                  // </div>
                );
              case 1:
                return (
                  <div className={classes.firstfeature}>
                    <div className={classes.secondIndFeature}>
                      <img src="https://t3.ftcdn.net/jpg/02/14/78/50/240_F_214785002_OlxmM6zyErRmXWetya322nSdpWjPy2yC.jpg" />

                      <div className={classes.secfeatureind}>
                        We completely respect our customers and their privacy.We
                        work hard to be able to provide good service to them.
                      </div>
                    </div>
                    <div className={classes.secondIndFeature}>
                      <img src="https://cdn-icons-png.flaticon.com/128/1534/1534214.png" />
                      <div className={classes.secfeatureind}>
                        We completely respect our customers and their privacy.We
                        work hard to be able to provide good service to them.
                      </div>
                    </div>
                    <div className={classes.secondIndFeature}>
                      <img src="https://as2.ftcdn.net/v2/jpg/01/98/55/55/1000_F_198555564_HiWOiEyc5pE7FRggzHvDKTT3460GelIl.jpg" />
                      <div className={classes.secfeatureind}>
                        We completely respect our customers and their privacy.We
                        work hard to be able to provide good service to them.
                      </div>
                    </div>
                  </div>
                  // <div className={classes.featuresCnt}>
                  //   <img src={featuredesc[ind]} />
                  // </div>
                );
              case 2:
                return (
                  
                  <div className={classes.firstfeature}>
                    <div className={classes.firstIndFeature}>
                      FIRST50
                      <img src="https://images.firstpost.com/wp-content/uploads/2021/02/steam-lunar-new-year-sale.jpg" />
                      <div className={classes.featureind}>
                        *only for first time customers
                      </div>
                    </div>
                    <div className={classes.firstIndFeature}>
                      DEAL50
                      <img src="https://image.shutterstock.com/image-vector/discount-coupons-dancers-illustration-set-260nw-1744461797.jpg" />
                      <div className={classes.featureind}>
                        *only for orders above $80
                      </div>
                    </div>
                    <div className={classes.firstIndFeature}>
                      TRUCK50
                      <img src="https://ak3.picdn.net/shutterstock/videos/5288123/thumb/3.jpg?ip=x480" />
                      <div className={classes.featureind}>
                        *only for SUPER customers
                      </div>
                    </div>
                  </div>
                  // <div className={classes.featuresCnt}>
                  //   <img src={featuredesc[ind]} />
                  // </div>
                );
            }
          }
        })}
      </div>
          </div>
      
      <div className={classes.custTestFlex}>
      <div className={classes.test}>
        Still Not convinced?Just hear out what our customers have gotta say
        right below!
        
      </div>
      <div className={classes.slide}>
        <div
          className={classes.slideshow}
          style={{ transform: `translateX(${-slideNum * (100 / 3)}%)` }}
        >
          <div className={classes.indSlide}>
            <h3>The best service ever!</h3>
            <blockquote>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.. <span>♥♥</span>
            </blockquote>
            <address className={classes.addressFlex}>
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXR8ZW58MHx8MHx8&w=1000&q=80"
                alt=""
              />
              <div className={classes.divFlex}>
                <h6>Francisco Gomes</h6>
                <p>Lisbon, Portugal</p>
              </div>
            </address>
          </div>
          <div className={classes.indSlide}>
            <h3>Good service from the delivery partners!</h3>
            <blockquote>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<span>♥♥</span>
            </blockquote>
            <address className={classes.addressFlex}>
              <img
                src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80"
                alt=""
              />
              <div className={classes.divFlex}>
                <h6>Francisco Gomes</h6>
                <p>Lisbon, Portugal</p>
              </div>
            </address>
          </div>
          <div className={classes.indSlide}>
            <h3>Prompt Service!</h3>
            <blockquote>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<span>♥♥</span>
            </blockquote>
            <address className={classes.addressFlex}>
              <img
                src="https://images.squarespace-cdn.com/content/v1/54b6ceb9e4b0567044aade14/1601924492132-EA7AF1NQKS4JP6LOF6ZU/krt2-500.png"
                alt=""
              />
              <div className={classes.divFlex}>
                <h6>Francisco Gomes</h6>
                <p>Lisbon, Portugal</p>
              </div>
            </address>
          </div>
        </div>
        <div className={classes.btnGrp}>
          {items.map((_, idx) => {
            if (idx === slideNum) {
              return (
                <div
                  key={idx}
                  className={classes.slideshowDot}
                  style={{ backgroundColor: "chocolate" }}
                ></div>
              );
            } else {
              return <div key={idx} className={classes.slideshowDot}></div>;
            }
          })}
        </div>
      </div>
      </div>
      
      <div className={classes.footerGrp}>
        <div>
          The best day to join Food Truck was one year ago. The second best is
          today!
        </div>

        <footer className={classes.footer}>
          <img src="https://cdn-icons-png.flaticon.com/512/45/45332.png" />
          <nav>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Terms of Use</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Privacy</a>
              </li>
              <li>
                <a href="#">Career</a>
              </li>
            </ul>
          </nav>
          {/* <h6>Follow us on</h6> */}
          <div className={classes.imgFlex}>
            <img src="https://cdn-icons-png.flaticon.com/128/2111/2111463.png" />
            <img src="https://cdn-icons-png.flaticon.com/128/145/145802.png" />
            <img src="https://cdn-icons-png.flaticon.com/128/733/733585.png" />
            <img src="https://cdn-icons-png.flaticon.com/512/1312/1312142.png" />
          </div>
        </footer>
      </div>
    </section>
  );
};

export default StartingPageContent;
