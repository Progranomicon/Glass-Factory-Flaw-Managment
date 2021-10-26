n __construct(PHPExcel_Worksheet $parent, $arguments) {
		$cacheTime	= (isset($arguments['cacheTime']))	? $arguments['cacheTime']	: 600;

		if (is_null($this->_cachePrefix)) {
			$baseUnique = $this->_getUniqueID();
			$this->_cachePrefix = substr(md5($baseUnique),0,8).'.';
			$this->_cacheTime = $cacheTime;

			parent::__construct($parent);
		}
	}	//	function __construct()


	/**
	 * Destroy this cell collection
	 */
	public function __destruct() {
		$cacheList = $this->getCellList();
		foreach($cacheList as $cellID) {
			wincache_ucache_delete($this->_cachePrefix.$cellID.'.cache');
		}
	}	//	function __destruct()


	/**
	 * Identify whether the caching method is currently available
	 * Some methods are dependent on the availability of certain extensions being enabled in the PHP build
	 *
	 * @return	boolean
	 */
	public static function cacheMethodIsAvailable() {
		if (!function_exists('wincache_ucache_add')) {
			return false;
		}

		return true;
	}

}
                ion		1.8.0, 2014-03-02
 */


/**
 * PHPExcel_Chart_Legend
 *
 * @category	PHPExcel
 * @package		PHPExcel_Chart
 * @copyright	Copyright (c) 2006 - 2014 PHPExcel (http://www.codeplex.com/PHPExcel)
 */
class PHPExcel_Chart_Legend
{
	/** Legend positions */
	const xlLegendPositionBottom	= -4107;	//	Below the chart.
	const xlLegendPositionCorner	= 2;		//	In the upper right-hand corner of the chart border.
	const xlLegendPositionCustom	= -4161;	//	A custom position.
	const xlLegendPositionLeft		= -4131;	//	Left of the chart.
	const xlLegendPositionRight		= -4152;	//	Right of the chart.
	const xlLegendPositionTop		= -4160;	//	Above the chart.

	const POSITION_RIGHT	= 'r';
	const POSITION_LEFT		= 'l';
	const POSITION_BOTTOM	= 'b';
	const POSITION_TOP		= 't';
	const POSITION_TOPRIGHT	= 'tr';

	private static $_positionXLref = array( self::xlLegendPositionBottom	=> self::POSITION_BOTTOM,
											self::xlLegendPositionCorner	=> self::POSITION_TOPRIGHT,
											self::xlLegendPositionCustom	=> '??',
											self::xlLegendPositionLeft		=> self::POSITION_LEFT,
											self::xlLegendPositionRight		=> self::POSITION_RIGHT,
											self::xlLegendPositionTop		=> self::POSITION_TOP
										  );

	/**
	 * Legend position
	 *
	 * @var	string
	 */
	private $_position = self::POSITION_RIGHT;

	/**
	 * Allow overlay of other elements?
	 *
	 * @var	boolean
	 */
	private $_overlay = TRUE;

	/**
	 * Legend Layout
	 *
	 * @var	PHPExcel_Chart_Layout
	 */
	private $_layout = NULL;


	/**
	 *	Create a new PHPExcel_Chart_Legend
	 */
	public function __construct($position = self::POSITION_RIGHT, PHPExcel_Chart_Layout $layout = NULL, $overlay = FALSE)
	{
		$this->setPosition($position);
		$this->_layout = $layout;
		$this->setOverlay($overlay);
	}

	/**
	 * Get legend position as an excel string value
	 *
	 * @return	string
	 */
	public function getPosition() {
		return $this->_position;
	}

	/**
	 * Get legend position using an excel string value
	 *
	 * @param	string	$position
	 */
	public function setPosition($position = self::POSITION_RIGHT) {
		if (!in_array($position,self::$_positionXLref)) {
			return false;
		}

		$this->_position = $position;
		return true;
	}

	/**
	 * Get legend position as an Excel internal numeric value
	 *
	 * @return	number
	 */
	public function getPositionXL() {
		return array_search($this->_position,self::$_positionXLref);
	}

	/**
	 * Set legend position using an Excel internal numeric value
	 *
	 * @param	number	$positionXL
	 */
	public function setPositionXL($positionXL = self::xlLegendPositionRight) {
		if (!array_key_exists($positionXL,self::$_positionXLref)) {
			return false;
		}

		$this->_position = self::$_positionXLref[$positionXL];
		return true;
	}

	/**
	 * Get allow overlay of other elements?
	 *
	 * @return	boolean
	 */
	public function getOverlay() {
		return $this->_overlay;
	}

	/**
	 * Set allow overlay of other elements?
	 *
	 * @param	boolean	$overlay
	 * @return	boolean
	 */
	public function setOverlay($overlay = FALSE) {
		if (!is_bool($overlay)) {
			return false;
		}

		$this<?php
/**
 * PHPExcel
 *
 * Copyright (c) 2006 - 2014 PHPExcel
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms 