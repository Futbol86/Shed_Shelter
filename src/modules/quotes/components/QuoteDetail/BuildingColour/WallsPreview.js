import React from 'react';

class WallsPreview extends React.Component {
    render() {
        const {wallColors0, wallColors1, wallColors2, wallColors3, handleWallPreviewClick} = this.props;
        return (
            <div className="d-flex flex-row align-items-center justify-content-center" style={{height: '100%', width: '100%'}}>
                <div className="d-flex flex-column justify-content-start" style={{width: '26px'}}>
                    <div style={{height: '26px'}}>
                        {' '}
                    </div>
                    <div className="d-flex align-items-center justify-content-center wallPreview"
                         style={{height: '80px', width: '26px', border: '1px solid #000000', cursor: 'pointer', backgroundColor: wallColors0}}
                         onClick={() => handleWallPreviewClick(0)}
                    >
                        <div className="verticalText">
                            Wall 1
                        </div>
                    </div>
                    <div style={{height: '26px'}}>
                        {' '}
                    </div>
                </div>
                <div className="d-flex flex-column justify-content-start" style={{width: '100px'}}>
                    <div className="d-flex align-items-center justify-content-center wallPreview"
                         style={{height: '26px', border: '1px solid #000000', cursor: 'pointer', backgroundColor: wallColors2}}
                         onClick={() => handleWallPreviewClick(2)}
                    >
                        <span className="">
                            Side Wall 1
                        </span>
                    </div>
                    <div style={{height: '80px'}}>
                        {' '}
                    </div>
                    <div className="d-flex align-items-center justify-content-center wallPreview"
                         style={{height: '26px', border: '1px solid #000000', cursor: 'pointer', backgroundColor: wallColors3}}
                         onClick={() => handleWallPreviewClick(3)}
                    >
                        <span className="">
                            Side Wall 2
                        </span>
                    </div>
                </div>
                <div className="d-flex flex-column justify-content-start" style={{width: '20px'}}>
                    <div style={{height: '26px'}}>
                        {' '}
                    </div>
                    <div className="d-flex align-items-center justify-content-center wallPreview"
                         style={{height: '80px', width: '26px', border: '1px solid #000000', cursor: 'pointer', backgroundColor: wallColors1}}
                         onClick={() => handleWallPreviewClick(1)}
                    >
                        <div className="verticalText">
                            Wall 2
                        </div>
                    </div>
                    <div style={{height: '26px'}}>
                        {' '}
                    </div>
                </div>
            </div>
        )
    }
}

export default WallsPreview;