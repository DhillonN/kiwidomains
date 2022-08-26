import {editRecord} from '../utils/functions'

export const renderMints = () => {
    if (currentAccount && mints.length > 0) {
        return (
            <div className="mint-container"><Card />
                <p className="subtitle"> Recently minted domains!</p>
                <div className="mint-list">
                    {mints.map((mint, index) => {
                        return (
                            <Card mint={mint} index={index} editRecord={editRecord()} CONTRACT_ADDRESS={CONTRACT_ADDRESS} />

                        )
                    })}
                </div>
            </div>
        );
    }
};