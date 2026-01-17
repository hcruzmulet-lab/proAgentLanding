'use client';

import React from 'react';
import './AlgVacationsPage.scss';

export function AlgVacationsPage() {
  return (
    <div className="alg-vacations-page">
      <div className="alg-vacations-page__iframe-container">
        <iframe
          src="https://login.www.vaxvacationaccess.com/Default.aspx?returnUrl=https%3a%2f%2flogin.www.vaxvacationaccess.com%2fsamlidp.aspx%3fanchorstore%3dALG%26vendorcode%3dALG%26samlrequest%3dfJFPb8IwDMXvfIoqh93on1AGzShTBdKExKQJNg67mdRApTbp4rT04y90TBsXjrHze8%252fPnhFUJa9F1tiT2uBXg2S9rioViZ9OyhqjhAYqSCiokISVYpu9rgX3Q1EbbbXUJfvP3EeACI0ttGLeapmyIueHyRRGhyjZyzh%252bnPJ9nGCEyQT5%252bDBKEmTeDg05IGWOdxRRgytFFpR1pZCPh1E45NP3KBZxIkL%252bybyli1EosD11srYmEQSlPhbKP5%252fPfgtdC7Jvg5RI5EtdBZfhi7z2geruGZQ8abO12mCarV8eoKqfWlS5Ngud9yXmZb9RFlpRU6HZomkLiR%252bb9Z8rlMc7npe1BDvo3ox2kkEmic0HnjfrFyn6qGZ%252bkXJK7sMdpcsFr%252f40C274wfV9e%252bb5NwAAAP%252f%252fAwA%253d%26relaystate%3dcQZCfw-1ot6XpECLRByb9yBp%26sigalg%3dhttp%253a%252f%252fwww.w3.org%252f2001%252f04%252fxmldsig-more%2523rsa-sha256%26signature%3dRxheY0yoQnl%252fbNUpoOR%252fdbJjrYmCHAM3BY6FWdtec%252fyayGKvgAM00yj9vWlx3qNiLBSx2wEVsrJ1WeKf0cwq9QAObA6wvz1UMgCR7tYNz8t%252bSFZ01bdEsHPFWnvulF8%252bjNmLYvv0EUrdojHMXT2PgLyFh4dkq9epHYjhC7fli2tNtmqoYoPwzEvBsVx16LhMpmNDYUxRgyrQm7w71PZhW6g7HbH6jedEMM66yKX0Wgmd1cghEfNLMfnGu1AC%252f7zeKdIFeQKv%252f6Y53JJTqkvwrcngVoY%252bhGa%252b%252fKhg%252b9GPHsQvFNL5PQMrqufIOyNzHuGk4yE81xLreS17uaTt2ePtdw%253d%253d"
          className="alg-vacations-page__iframe"
          title="ALG Vacations"
          allow="fullscreen"
        />
      </div>
    </div>
  );
}
