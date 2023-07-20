<script>

const linkedinURL = "https://www.linkedin.com/in/guillaume-kotulski-008a11103/"
</script>

<main>
    <div class="row-adaptive full-height">
        <div  class="left-half"/>
        <div class="column half right-half">
            <div class="t1 upper top">Guillaume Kotulski</div>
            <p>6 years of experience as a Software Engineer
                But how did I get there?...
                
                I learnt to code in high school. Back then, I used to write my code with a pen & paper during lessons
                and after school I transferred all of it to my computer. Since then, my passion for new technologies has never run out!
                I always have new ideas to implement, new articles to read. All the things I learn I am always eager to share it with friends and colleagues. 
                Outside of work I am a passionate cyclist. You can find me learning Japanese, coding on personal projects, discovering new board games! Feel free to reach out on <a href={linkedinURL} target="_blank">LinkedIn</a></p>
        </div>
    </div>

</main>


<style>

    .right-half {
        max-width: 100%;
        padding-left: 20px;

    }

    p {
        line-height: 2em;
        text-align: left;
        padding-left: 15px;
        max-width: 70%;
        white-space: pre-line; /* collapse WS, preserve LB */
    }

    .left-half {
        background-image: url($lib/assets/dev_2.jpg); /* change back to whatever background image you want */
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        flex: 0 0 50%; /* flex-basis: 50% */
    }

    .top {
        margin-top: 10px;
    }

    main {
        height: 100%;
    }

    .upper {
        text-transform: uppercase;
    }

    .row-adaptive {
        display: flex;
        flex-direction: row;
    }

    .half {
        flex: 0 0 50%;
        height: 100%;
    }
    @media only screen and (max-width: 800px) {
        .half {
            flex: 0 0 50%;
            height: 50%;
        }

        .row-adaptive {
            display: flex;
            flex-direction: column;
        } 

        p {
            max-width: 95%;
        }
    }

    .column {
        display: flex;
        flex-direction: column;
    }

    .full-height {
        height: 100%;
    }
</style>
