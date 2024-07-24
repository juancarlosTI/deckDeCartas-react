import { useState, useEffect } from 'react'
import './deck-of-cards.css'

async function createDeck() {
    const response = await fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
    const deck = await response.json();
    return deck.deck_id
}

async function getCard(deckId) {
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    return await response.json()
}



const DeckOfCards = () => {

    const [deckAtual, setDeckAtual] = useState({
        deck_atual:String()
    })

    const [deck, setDeck] = useState({
        requested_cards: []
    })

    const [savedDeck, setSavedDeck] = useState({
        saved_cards: []
    })

    useEffect(() => {
        const fetchData = async () => {
            const deckId = await createDeck()
            const data = await getCard(deckId)

            setDeck({
                requested_cards: data.cards
            })

            setDeckAtual({
                deck_atual:deckId
            })
        }
        fetchData()
    }, [])


    return (
        <>
            <section className='main-deck'>
                <ul className='requested-cards'>
                    {
                        deck.requested_cards.map((card) => {
                            return (
                                <li key={card.code}>
                                    <img key={card.code} src={card.image} alt={card.value}></img>
                                </li>
                            )
                        })
                    }
                </ul>
                <ul className='saved-cards'>
                    {
                        savedDeck.saved_cards.map((card) => {
                            return (
                                <>
                                    <li key={card.code}>
                                        <img key={card.code} src={card.image} alt={card.value}/>
                                    </li>
                                </>
                            )
                        })
                    }
                </ul>
            </section>
            <section className='btns'>
                <button className='btn-pick-a-card' value='Pick a card' onClick={() => {
                    const fetchCards = async () => {
                        const cards = await getCard(deckAtual.deck_atual)

                        console.log(cards)
                        setDeck({
                            requested_cards:cards.cards
                        })
                    }
                    fetchCards()
                }
            }
                >Pick a card</button>
                <button className='btn-save-a-card' value='Save a card' onClick={() => {
                    setSavedDeck({
                        saved_cards: [...savedDeck.saved_cards,deck.requested_cards[0]]
                    })
                }}
                >Save a card</button>
            </section>
        </>


    )
}


export default DeckOfCards
