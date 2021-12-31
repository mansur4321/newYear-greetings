var vue = new Vue({
    el: '#app',
    data() {
        return {
            title: 'Введи своё имя, чтобы я знал кому кинуть цииуууу.\nP.S. введи с большой буквы)',
            
            nameThisUser: '-',

            users: [
                {
                    name: 'Даша',
                    urlImgCube: 'img/dasha-cube.jpg',
                    urlImg: 'img/dasha2.jpg',
                },
                {
                    name: 'Хасан',
                    urlImgCube: 'img/khasan-cube.jpg',
                    urlImg: 'img/khasan.jpg',
                },
                {
                    name: 'Влад',
                    urlImgCube: 'img/vlad-cube.jpg',
                    urlImg: 'img/vlad.jpg',
                },
                {
                    name: 'Рушана',
                    urlImgCube: 'img/rush-cube.jpg',
                    urlImg: 'img/rush2.jpg',
                },
                {
                    name: 'Хамиз',
                    urlImgCube: 'img/hamiz-cube.jpg',
                    urlImg: '../img/hamiz2.jpg',
                },
                {
                    name: 'Арсен',
                    urlImgCube: 'img/arsen-cube.jpg',
                    urlImg: 'img/arsen.jpg',
                },
                {
                    name: 'Тимур',
                    urlImgCube: 'img/timur-cube.jpg',
                    urlImg: 'img/timur.jpg',
                },
                {
                    name: 'Мансур',
                    urlImgCube: 'img/mansur.jpg',
                    urlImg: 'img/mansur.jpg',
                },
                {
                    name: 'noname',
                    urlImg: 'img/noname.jpg',
                }

            ],

            usersMaping: ['Хасан', 'Даша', 'Рушана', 'Хамиз', 'Арсен', 'Влад', 'Тимур', 'Мансур', 
            'Хасан', 'Даша', 'Рушана', 'Хамиз', 'Арсен', 'Влад', 'Тимур', 'Мансур'],

            numOpenCard: [],

            coupleToWin: 8,

        }
    },

    created() {
        this.nameThisUser = prompt(this.title);
        this.randomArray();
    },

    watch: {
        numOpenCard() {
            if (this.numOpenCard.length == 2) {
                if (this.numOpenCard[0].name == this.numOpenCard[1].name) {
                    this.coupleToWin -= 1;
                }else {
                    this.litleLose();
                }


                this.numOpenCard.length = 0;
            }
        },

        nameThisUser() {
            if (this.users.find(user => user.name == this.nameThisUser) == undefined) {
                this.nameThisUser = prompt('Немного не правильно. Или ты не мой друг? Тогда напиши noname.');
            }


            let urlImg = this.users.find(user => user.name == this.nameThisUser).urlImg;
            document.querySelector('.pozdravlenie').style.background = `url("${urlImg}") center / 100% 100% no-repeat`;
            
        },

        coupleToWin() {
            if (this.coupleToWin == 0) {
                this.uWin();
            }
        }
    },

    methods: {
        openCard(elem, nameUser) {
            elem.style.transform = "rotateY(180deg)";
            elem.nextSibling.nextSibling.style.transform = "rotateY(0deg)";

            setTimeout(() => {this.numOpenCard.push({name: nameUser, teg: elem})}, 1000);
        },

        litleLose() {
            let sibling = this.numOpenCard[0].teg.nextSibling.nextSibling;
            this.numOpenCard[0].teg.style.transform = "rotateY(0deg)";
            sibling.style.transform = "rotateY(180deg)";

            let siblingTwo = this.numOpenCard[1].teg.nextSibling.nextSibling;
            this.numOpenCard[1].teg.style.transform = "rotateY(0deg)";
            siblingTwo.style.transform = "rotateY(180deg)";
        },

        uWin() {
            let pozdravFrame = document.querySelector('.wrapper-pozdravlenie');
            pozdravFrame.style.top = '0%';
            
            setTimeout(this.winnerMusic, 1000);
        },

        winnerMusic() {
            let audio = new Audio(); 
            audio.src = 'audio/Christmas_Rock.mp3'; 
            audio.autoplay = true;
        },

        randomArray() {
            for (let i = 0; i < this.usersMaping.length; i++) {
                let rnd = this.getRandom(16);
                let interm = this.usersMaping[i];

                this.usersMaping[i] = this.usersMaping[rnd];
                this.usersMaping[rnd] = interm;
            }
        },
        
        getRandom(max) {
            return Math.floor(Math.random() * max);
        },

        searchURL(nameUser) {
            return this.users.find(user => user.name == nameUser).urlImgCube;
        }
    }

   
});
