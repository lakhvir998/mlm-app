let normal_headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-App-Version': 14
};

let authenticated_headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-App-Version': 14
};

export default class API {
    // static base_url = 'http://192.168.0.102:3000';
    // static base_url = 'http://192.168.43.107:3000';
    static base_url = 'http://139.59.66.125';

    static handleResponse(resp, cb) {
        try {
            resp = JSON.parse(resp._bodyText);
            cb(resp);
        } catch(e) {
            cb({ status: false, error: 'Network error' });
        }
    }

    static updateToken(token, mobile) {
        authenticated_headers['X-User-Token'] = token;
        authenticated_headers['X-User-Mobile'] = mobile;
    }

    // UsersController

    static register(data, cb) {
        fetch(`${this.base_url}/api/v1/users`, {
            method: 'POST',
            body: JSON.stringify({
                user: data
            }),
            headers: normal_headers
        }).then((resp) => {
            this.handleResponse(resp, cb);
        }).catch((e) => {
            this.handleResponse('asd', cb);
        });
    }

    static authorize(token, cb) {
        fetch(`${this.base_url}/api/v1/users/authorize`, {
            method: 'POST',
            headers: normal_headers,
            body: JSON.stringify({
                user: {
                    access_token: token
                }
            })
        }).then((resp) => {
            this.handleResponse(resp, cb);
        });
    }

    static getSponsors(cb) {
        fetch(`${this.base_url}/api/v1/users/sponsor-ids`, {
            headers: normal_headers
        })
            .then(resp => this.handleResponse(resp, cb))
            .catch(e => this.handleResponse('asd', cb));
    }

    static selectSponsor(data, cb) {
        fetch(`${this.base_url}/api/v1/users/sponsor`, {
            method: 'POST',
            headers: authenticated_headers,
            body: JSON.stringify({
                user: data
            })
        }).then((resp) => {
            this.handleResponse(resp, cb);
        }).catch((e) => {
            this.handleResponse('asd', cb);
        });
    }

    static getMe(cb) {
        fetch(`${this.base_url}/api/v1/users`, {
            headers: authenticated_headers
        })
            .then(resp => this.handleResponse(resp, cb))
            .catch(e => this.handleResponse('asd', cb));
    }

//    WalletsController
    static wallet(cb) {
        fetch(`${this.base_url}/api/v1/wallets`, {
            headers: authenticated_headers
        }).then((resp) => {
            this.handleResponse(resp, cb);
        }).catch((err) => {
            this.handleResponse('asd', cb);
        });
    }

//    TransactionsController
    static video1(cb) {
        fetch(`${this.base_url}/api/v1/transactions/video1`, {
            method: 'PATCH',
            headers: authenticated_headers
        }).then((resp) => {
            this.handleResponse(resp, cb);
        }).catch(err => {
            this.handleResponse('asd', cb);
        });
    }

    static video2(cb) {
        fetch(`${this.base_url}/api/v1/transactions/video2`, {
            method: 'PATCH',
            headers: authenticated_headers
        }).then((resp) => {
            this.handleResponse(resp, cb);
        }).catch(err => {
            this.handleResponse('asd', cb);
        });
    }

    static transactionDetails(type, cb) {
        fetch(`${this.base_url}/api/v1/transactions/${type}`, {
            headers: authenticated_headers
        })
            .then(resp => this.handleResponse(resp, cb))
            .catch(e => this.handleResponse('asd', cb));
    }

//    SettingsController
    static settings(cb) {
        fetch(`${this.base_url}/api/v1/settings`, {
            headers: authenticated_headers
        }).then((resp) => {
            this.handleResponse(resp, cb);
        }).catch((err) => {
            this.handleResponse('asd', cb);
        });
    }

//    LimitsController
    static limits(cb) {
        fetch(`${this.base_url}/api/v1/limits`, {
            headers: authenticated_headers
        }).then((resp) => {
            this.handleResponse(resp, cb);
        }).catch(err => {
            this.handleResponse('asd', cb);
        });
    }

//    QuizAttemptsController
    static attemptQuiz(cb) {
        fetch(`${this.base_url}/api/v1/quiz-attempts`, {
            headers: authenticated_headers,
            method: 'POST'
        }).then((resp) => {
            this.handleResponse(resp, cb);
        }).catch((e) => {
            this.handleResponse('asd', cb);
        });
    }

//    QuizQuestionAttemptsController
    static getQuizQuestions(id, cb) {
        fetch(`${this.base_url}/api/v1/quiz-question-attempts/${id}`, {
            headers: authenticated_headers
        }).then((resp) => {
            this.handleResponse(resp, cb);
        }).catch((e) => {
            this.handleResponse('asd', cb);
        });
    }

    static answerQuizQuestion(data, id, cb) {
        fetch(`${this.base_url}/api/v1/quiz-question-attempts/${id}`, {
            headers: authenticated_headers,
            body: JSON.stringify({
                quiz_question_attempt: data
            }),
            method: 'PATCH'
        }).then((resp) => {
            this.handleResponse(resp, cb);
        }).catch((e) => {
            this.handleResponse('asd', cb);
        });
    }

//    OffersController
    static getOffers(cb, page = 1) {
        fetch(`${this.base_url}/api/v1/offers?page=${page}`, {
            headers: authenticated_headers
        }).then((resp) => {
            this.handleResponse(resp, cb);
        }).catch((e) => {
            this.handleResponse('asd', cb);
        });
    }

//    TasksController
    static getTasks(cb, page = 1) {
        fetch(`${this.base_url}/api/v1/tasks?page=${page}`, {
            headers: authenticated_headers
        }).then((resp) => {
            this.handleResponse(resp, cb);
        }).catch((e) => {
            this.handleResponse('asd', cb);
        });
    }

    static taskSubmit(data, id, cb) {
        fetch(`${this.base_url}/api/v1/tasks/${id}/submit`, {
            headers: authenticated_headers,
            method: 'POST',
            body: JSON.stringify({
                task_submit: data
            })
        }).then((resp) => {
            this.handleResponse(resp, cb);
        }).catch((e) => {
            this.handleResponse('asd', cb);
        });
    }

//    ProductsController
    static getProducts(cb, page = 1) {
        fetch(`${this.base_url}/api/v1/products?page=${page}`, {
            headers: authenticated_headers
        }).then((resp) => {
            this.handleResponse(resp, cb);
        }).catch((e) => {
            this.handleResponse('asd', cb);
        });
    }

//    UserLevelsController
    static getUpline(cb) {
        fetch(`${this.base_url}/api/v1/user-levels/upline`, {
            headers: authenticated_headers
        })
            .then(resp => this.handleResponse(resp, cb))
            .catch(e => this.handleResponse('asd', cb));
    }

    static getLevel(level, cb, page = 1) {
        fetch(`${this.base_url}/api/v1/user-levels/${level}?page=${page}`, {
            headers: authenticated_headers
        })
            .then(resp => this.handleResponse(resp, cb))
            .catch(e => this.handleResponse('asd', cb));
    }

    static getLevelsInfo(cb) {
        fetch(`${this.base_url}/api/v1/user-levels`, {
            headers: authenticated_headers
        })
            .then(resp => this.handleResponse(resp, cb))
            .catch(e => this.handleResponse('asd', cb));
    }

//    DealsController
    static getDeals(cb, page = 1) {
        fetch(`${this.base_url}/api/v1/deals?page=${page}`, {
            headers: authenticated_headers
        })
            .then(resp => this.handleResponse(resp, cb))
            .catch(e => this.handleResponse('asd', cb));
    }

//    DealUploadsController
    static uploadDeal(id, image, cb) {
        fetch(`${this.base_url}/api/v1/deal-uploads/${id}`, {
            method: 'POST',
            headers: authenticated_headers,
            body: JSON.stringify({
                deal_upload: {
                    image: image
                }
            })
        })
            .then(resp => this.handleResponse(resp, cb))
            .catch(e => this.handleResponse('asd', cb));
    }

//    QuizWinnersController
    static getQuizWinners(cb) {
        fetch(`${this.base_url}/api/v1/quiz-winners`, {
            headers: authenticated_headers
        })
            .then(resp => this.handleResponse(resp, cb))
            .catch(e => this.handleResponse('asd', cb));
    }

//    RedeemsController
    static getTime(cb) {
        fetch(`${this.base_url}/api/v1/redeems`, {
            headers: authenticated_headers
        })
            .then(resp => this.handleResponse(resp, cb))
            .catch(e => this.handleResponse('asd', e));
    }

    static redeemPaypal(data, cb) {
        fetch(`${this.base_url}/api/v1/redeems/paypal`, {
            headers: authenticated_headers,
            body: JSON.stringify({
                redeem: data
            }),
            method: 'POST'
        })
            .then(resp => this.handleResponse(resp, cb))
            .catch(e => this.handleResponse('asd', cb));
    }

    static redeemPayTM(data, cb) {
        fetch(`${this.base_url}/api/v1/redeems/paytm`, {
            headers: authenticated_headers,
            body: JSON.stringify({
                redeem: data
            }),
            method: 'POST'
        })
            .then(resp => this.handleResponse(resp, cb))
            .catch(e => this.handleResponse('asd', cb));
    }

    static redeemBank(data, cb) {
        fetch(`${this.base_url}/api/v1/redeems/bank`, {
            headers: authenticated_headers,
            body: JSON.stringify({
                redeem: data
            }),
            method: 'POST'
        })
            .then(resp => this.handleResponse(resp, cb))
            .catch(e => this.handleResponse('asd', cb));
    }

    static redeemSkrill(data, cb) {
        fetch(`${this.base_url}/api/v1/redeems/skrill`, {
            headers: authenticated_headers,
            body: JSON.stringify({
                redeem: data
            }),
            method: 'POST'
        })
            .then(resp => this.handleResponse(resp, cb))
            .catch(e => this.handleResponse('asd', cb));
    }

}
